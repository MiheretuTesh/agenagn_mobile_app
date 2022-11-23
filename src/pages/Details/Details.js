import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageIcon from 'react-native-vector-icons/AntDesign';
import MessageIconContact from 'react-native-vector-icons/MaterialCommunityIcons';
import CallIcon from 'react-native-vector-icons/Ionicons';
import houses from '../../constants/houses';
import CallNumber from '../../utils/phoneCall';
import {onChange, useEvent} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeartIcon from 'react-native-vector-icons/Ionicons';
import config from '../../constants/config.keys';
import {getAllHouses} from '../../features/house/house.Slice';

const SPACING = 15;
const {width} = Dimensions.get('screen');

const Details = ({navigation, route}) => {
  const dispatch = useDispatch();

  const opacity = useRef(new Animated.Value(0)).current;
  const scrollTopRef = useRef();
  const [selectedImage, setSelectedImage] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);
  const house = route.params;
  console.log(house, 'house details');
  const safeInsets = useSafeAreaInsets();
  const [token, setToken] = useState();
  const [favorites, setFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getAllHouses());
  }, []);

  const {
    housesData,
    isHousesDataLoading,
    isHousesDataSuccess,
    isHousesDataFailed,
    getHousesError,
  } = useSelector(state => state.houses);

  const houseList = housesData.houses.slice(0, 4);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const handleFavorite = async () => {
    try {
      if (favorites.includes(house.id)) {
        favorites.filter(value => value !== house.id);
        setIsFavorite(false);
        AsyncStorage.setItem('favorites', JSON.stringify(favorites))
          .then(req => console.log('success removing data'))
          .catch(err => console.log('Error'));
      } else {
        setIsFavorite(true);

        favorites.push(house.id);
        AsyncStorage.setItem('favorites', JSON.stringify(favorites))
          .then(req => {
            console.log(req, 'success adding new data');
            console.log(favorites);
          })
          .catch(err => console.log('Error'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      AsyncStorage.getItem('favorites')
        .then(req => JSON.parse(req))
        .then(json => {
          setFavorites(json);
          if (json.includes(house.id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        })
        .catch(err => console.log('Error'));
      // const value = await AsyncStorage.getItem('favorites');
      // const res = JSON.parse(value);
      // if (res.includes(house.id)) {
      //   setIsFavorite(true);
      //   setFavorites(res);
      // } else {
      //   setFavorites(res);
      // }
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [token]);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== selectedImage) {
        setSelectedImage(slide);
      }
    }
  };

  const scrollHandler = () => {
    if (dataSourceCords.length > selectedImage) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[selectedImage - 1],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 50,
      delay: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  // const onFabPress = () => {
  //   scrollTopRef.current?.scrollTo({
  //     y: 0,
  //     animated: true,
  //   });
  // };
  return (
    <SafeAreaView style={styles.detailsContainer} ref={scrollTopRef}>
      <ScrollView
        ref={ref => {
          setRef(ref);
        }}>
        <StatusBar translucent={false} backgroundColor={COLORS.blue} />
        <View>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              opacity,
              position: 'absolute',
              top: safeInsets.top + SPACING,
              left: safeInsets.left + SPACING,
              right: safeInsets.right + SPACING,
              zIndex: 1,
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="close-circle-outline"
                size={30}
                color={COLORS.white}
              />
              <Text>{token}</Text>
            </Pressable>
            <TouchableOpacity onPress={() => handleFavorite()}>
              <HeartIcon
                name={isFavorite ? 'md-heart-sharp' : 'md-heart-outline'}
                size={23}
                color={isFavorite ? COLORS.red : COLORS.white}
              />
            </TouchableOpacity>
          </Animated.View>
          <SharedElement id={house.id}>
            <ScrollView
              onScroll={({nativeEvent}) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}>
              {house.images ? (
                house.images.map((e, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: `${config.BASE_URI}/images/${house.User.email}/${house.User.email}${e}`,
                    }}
                    style={styles.wrap}
                    resizeMode="stretch"
                    onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      dataSourceCords[index] = layout.y;
                      setDataSourceCords(dataSourceCords);
                    }}
                  />
                ))
              ) : (
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1630815006371-03023f315214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmRvbWluaXVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                  }}
                  style={styles.wrap}
                  resizeMode="stretch"
                  onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    dataSourceCords[index] = layout.y;
                    setDataSourceCords(dataSourceCords);
                  }}
                />
              )}
            </ScrollView>

            {/* <Image
              source={house.images[selectedImage]}
              style={styles.postImage}
            /> */}
          </SharedElement>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              position: 'absolute',
              top: 155,
            }}>
            {house.images
              ? house.images.map((image, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedImage(index);
                      scrollHandler();
                    }}>
                    <View
                      style={{
                        borderColor:
                          selectedImage === index
                            ? COLORS.selectedImg
                            : COLORS.unSelectedImg,
                        borderRadius: 10,
                        borderWidth: 4,
                        margin: 4,
                      }}>
                      <Image
                        source={{
                          uri: `${config.BASE_URI}/images/${house.User.email}/${house.User.email}${image}`,
                        }}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 6,
                        }}
                      />
                    </View>
                  </Pressable>
                ))
              : ''}
          </View>
        </View>
        <View style={{paddingTop: 10, paddingLeft: 15, paddingRight: 15}}>
          <View>
            <Animated.Text
              style={{
                opacity,
                fontSize: 16,
                color: COLORS.green,
                fontWeight: 'bold',
              }}>
              {house.location}
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: 18,
                color: COLORS.dark,
                fontWeight: '500',
              }}>
              Monthly Rent: {house.monthlyPayment} Br/mo
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: 14,
                color: COLORS.locationColor,
                fontWeight: '500',
              }}>
              Location: {house.location}
            </Animated.Text>
          </View>
        </View>
        <Animated.View
          style={{
            height: 1.3,
            backgroundColor: COLORS.dividerColor,
            marginVertical: 10,
            marginHorizontal: 15,
          }}></Animated.View>
        {/* <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <BedIcon
              name="bed-king"
              size={25}
              style={{paddingRight: 3, color: COLORS.dark}}
            />
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.bedNo} Beds
            </Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <BathIcon
              name="bath"
              size={20}
              style={{paddingRight: 3, color: COLORS.dark}}
            />
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.bathNo} Bath
            </Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <RectangleIcon
              name="rectangle-outline"
              size={29}
              style={{paddingRight: 3, color: COLORS.dark}}
            />
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.area} sqrt
            </Text>
          </Animated.View>
        </View> */}
        {/* <Animated.View
          style={{
            height: 1.3,
            backgroundColor: COLORS.dividerColor,
            marginVertical: 10,
            marginHorizontal: 15,
          }}></Animated.View>
        <View style={styles.descriptionContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
            Description
          </Text>
          <Text style={{fontSize: 16, color: COLORS.dark}}>
            {house.description}
          </Text>
        </View> */}

        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              Bed Number
            </Text>
          </Animated.View>

          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.bedNo}
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>

        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>Floor</Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.floor}
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>

        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>Area</Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.area} sqrt
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>

        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              Phone Number
            </Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              {house.phoneNumber}
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>
        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              Guest House
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.iconsStyle,
              {
                backgroundColor: COLORS.red,
                paddingHorizontal: 6,
                borderRadius: 8,
              },
            ]}>
            <Text style={{paddingRight: 3, color: COLORS.white}}>No</Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>

        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              Available Date
            </Text>
          </Animated.View>
          <Animated.View style={styles.iconsStyle}>
            <Text style={{paddingRight: 3, color: COLORS.dark}}>
              12-06-2014
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>
        <View style={styles.iconsContainer}>
          <Animated.View style={styles.iconsStyle}>
            <View>
              <Text style={{paddingRight: 3, color: COLORS.dark, fontSize: 16}}>
                Description
              </Text>
              <Text style={{paddingRight: 3, color: COLORS.dark, fontSize: 15}}>
                {house.description}
              </Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={styles.horizontalDivider}></Animated.View>

        <View style={styles.detailExploreContainer}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            Explore More Houses
          </Text>
          <View style={styles.detailsHouseList}>
            {isHousesDataSuccess
              ? houseList.map((rep, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      navigation.navigate('DetailScreen', rep);
                      // onFabPress();
                    }}>
                    <View style={styles.detailsHouse}>
                      <SharedElement id={index.id}>
                        {rep.images ? (
                          <Image
                            source={{
                              uri: `${config.BASE_URI}/images/${rep.User.email}/${house.User.email}${rep.images[0]}`,
                            }}
                            style={{
                              width: '100%',
                              height: 130,
                              borderTopRightRadius: 15,
                              borderTopLeftRadius: 15,
                            }}
                          />
                        ) : (
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1630815006371-03023f315214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmRvbWluaXVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                            }}
                            style={{
                              width: '100%',
                              height: 130,
                              borderTopRightRadius: 15,
                              borderTopLeftRadius: 15,
                            }}
                          />
                        )}
                      </SharedElement>
                      <View style={{padding: 10}}>
                        <View>
                          <Text
                            style={{
                              color: COLORS.green,
                              fontWeight: '500',
                              fontSize: 12,
                            }}>
                            {rep.location}
                          </Text>
                          <Text
                            style={{
                              color: COLORS.dark,
                              fontSize: 13,
                              fontWeight: '500',
                            }}>
                            Price: {rep.monthlyPayment}Br/mo
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              color: COLORS.grey,
                              fontSize: 10,
                              fontWeight: '500',
                            }}>
                            Location: {rep.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))
              : ''}
          </View>
          {/* <Pressable onPress={() => navigation.navigate('Home')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: COLORS.white,
                  backgroundColor: COLORS.green,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                Load More
              </Text>
            </View>
          </Pressable> */}
        </View>
      </ScrollView>
      <Animated.View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => CallNumber(house.agentPhone)}>
          <View style={styles.contactBtn}>
            <MessageIconContact
              name="message-outline"
              size={29}
              style={{paddingRight: 3, color: COLORS.white, paddingRight: 10}}
            />
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: '500'}}>
              Contact agent
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    width: width,
  },
  detailsImg: {
    height: 200,
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    height: 200,
    width: '100%',
    backgroundColor: COLORS.transparent2,
  },
  detailsImgElements: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  detailsTopIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postImage: {
    height: 220,
    width: '100%',
  },
  wrap: {width: width, height: 220},
  postDetails: {
    paddingVertical: 10,
    paddingHorizontal: SPACING,
    color: COLORS.dark,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  postPrice: {
    fontSize: 24,
    color: COLORS.dark,
  },
  postContactButton: {
    marginVertical: SPACING,
    color: COLORS.dark,
  },
  iconsContainer: {
    paddingTop: 10,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconsStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },
  detailExploreContainer: {
    paddingVertical: 20,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  detailsHouseList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailsHouse: {
    width: width / 2 - 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    elevation: 10,
  },
  contactBtn: {
    backgroundColor: COLORS.green,
    width: '100%',
    flex: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 25,
  },

  horizontalDivider: {
    height: 1.3,
    backgroundColor: COLORS.dividerColor,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  iconsContainer: {
    paddingTop: 0,
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconsStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
