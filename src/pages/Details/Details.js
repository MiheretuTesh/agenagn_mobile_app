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
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import React, {useState, useEffect, useRef} from 'react';
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

const SPACING = 15;
const {width} = Dimensions.get('screen');

const Details = ({navigation, route}) => {
  const houseList = houses.slice(0, 4);
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedImage, setSelectedImage] = useState(0);
  const house = route.params;
  const safeInsets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 50,
      delay: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const houseImgList = () => {};
  return (
    <SafeAreaView style={styles.detailsContainer}>
      <ScrollView>
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
            </Pressable>
            <AntDesign name="hearto" size={25} color={COLORS.white} />
          </Animated.View>
          <SharedElement id={house.id}>
            <Image
              source={house.images[selectedImage]}
              style={styles.postImage}
            />
          </SharedElement>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              position: 'absolute',
              top: 155,
            }}>
            {house.images.map((image, index) => (
              <Pressable key={index} onPress={() => setSelectedImage(index)}>
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
                    source={image}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 6,
                    }}
                  />
                </View>
              </Pressable>
            ))}
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
              {house.title}
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: 18,
                color: COLORS.dark,
                fontWeight: '500',
              }}>
              Price: {house.price}Br/mo
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
        <View style={styles.iconsContainer}>
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
        </View>
        <Animated.View
          style={{
            height: 1.3,
            backgroundColor: COLORS.dividerColor,
            marginVertical: 10,
            marginHorizontal: 15,
          }}></Animated.View>

        {/* <View style={styles.profileContainer}>
          <Animated.View style={styles.profileImgContainer}>
            <Image
              source={require('../../assets/profile.jpg')}
              style={styles.profileImg}
            />
            <Text style={{fontSize: 17, fontWeight: '400', color: COLORS.dark}}>
              Abebe Birhanu
            </Text>
          </Animated.View>

          <Animated.View style={styles.profileIconContainer}>
            <MessageIcon
              name="message1"
              size={29}
              style={{paddingRight: 20, color: COLORS.dark}}
            />
            <CallIcon
              name="call-outline"
              size={29}
              style={{paddingRight: 3, color: COLORS.dark}}
            />
          </Animated.View>
        </View>
        <Animated.View
          style={{
            height: 1.2,
            backgroundColor: COLORS.dividerColor,
            marginVertical: 10,
            marginHorizontal: 15,
          }}></Animated.View> */}
        <View style={styles.descriptionContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
            Description
          </Text>
          <Text style={{fontSize: 16}}>{house.description}</Text>
        </View>

        <View style={styles.detailExploreContainer}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            Explore More Houses
          </Text>
          <View style={styles.detailsHouseList}>
            {houseList.map((rep, index) => (
              <Pressable
                key={index}
                // onPress={() => navigation.navigate('DetailsScreen', rep)}
              >
                <View style={styles.detailsHouse}>
                  <SharedElement id={index.id}>
                    <Image
                      source={rep.images[0]}
                      style={{
                        width: '100%',
                        height: 130,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                      }}
                    />
                  </SharedElement>
                  <View style={{padding: 10}}>
                    <View>
                      <Text
                        style={{
                          color: COLORS.green,
                          fontWeight: '500',
                          fontSize: 12,
                        }}>
                        {rep.title}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.dark,
                          fontSize: 13,
                          fontWeight: '500',
                        }}>
                        Price: {rep.price}Br/mo
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
            ))}
          </View>
          <Pressable onPress={() => navigation.navigate('HomeTab')}>
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
          </Pressable>
        </View>
      </ScrollView>
      <Animated.View style={styles.bottomContainer}>
        <Pressable onPress={() => navigation.goBack()}>
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
        </Pressable>
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
});
