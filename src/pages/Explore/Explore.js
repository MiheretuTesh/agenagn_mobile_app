import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Tab, TabView} from '@rneui/themed';
import {SharedElement} from 'react-navigation-shared-element';
import React, {useState, useEffect} from 'react';
import house from '../../constants/houses';
import COLORS from '../../constants/colors';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopNavigationContainer from '../../components/layout/TopNavigationContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {getAllHouses} from '../../features/house/house.Slice';
import config from '../../constants/config.keys';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('screen');

const Explore = ({navigation}) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState('');

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

  const onLayoutChange = event => {
    const {width, height} = event.nativeEvent.layout;
    console.log(width, height, 'Orientation');
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

    setOrientation(orientation);
  };

  const HouseTypeTabs = () => {
    const houseTypeList = ['All', 'Apartments', 'Condominium', 'Villa'];
    return (
      // <View style={styles.houseTabContainer}>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          height: 2,
          backgroundColor: COLORS.green,
        }}
        containerStyle={{backgroundColor: COLORS.white}}>
        <Tab.Item
          title={<Text style={{color: COLORS.dark}}>All</Text>}
          titleStyle={{fontSize: 11}}
          buttonStyle={{backgroundColor: COLORS.white}}
          containerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <Tab.Item
          title={<Text style={{color: COLORS.dark}}>Condominium</Text>}
          titleStyle={{fontSize: 11}}
          buttonStyle={{backgroundColor: COLORS.white}}
          containerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <Tab.Item
          title={<Text style={{color: COLORS.dark}}>Apartments</Text>}
          titleStyle={{fontSize: 11}}
          buttonStyle={{backgroundColor: COLORS.white}}
          containerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
      </Tab>
    );
  };

  const HouseLists = ({house}) => {
    return (
      <Pressable onPress={() => navigation.push('DetailScreen', house)}>
        <View style={styles.detailsHouse}>
          {house.images ? (
            <Image
              source={{
                uri: `${config.BASE_URI}/images/${house.User.email}/${house.User.email}${house.images[0]}`,
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
          <View style={{padding: 10}}>
            <View>
              <Text
                style={{
                  color: COLORS.green,
                  fontWeight: '500',
                  fontSize: 12,
                }}>
                {/* Apartment */}
                {house.location}
              </Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontSize: 13,
                  fontWeight: '500',
                }}>
                Price: 20,000Br/mo
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: COLORS.grey,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                Location: 4 kilo, Addis Ababa
              </Text>
            </View>
          </View>
          <View style={styles.cardDivider}></View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: 5,
              }}>
              <Text style={{color: COLORS.dark, fontSize: 11}}>Bed: </Text>
              <Text
                style={{color: COLORS.dark, fontSize: 11, fontWeight: '500'}}>
                {house.bedNo}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.dark, fontSize: 11}}>Area: </Text>
              <Text
                style={{color: COLORS.dark, fontSize: 11, fontWeight: '500'}}>
                {house.area}sqrt
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <TopNavigationContainer
        navigation={navigation}
        title={'Explore'}
        isLogged={false}
      />
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: COLORS.dark,
            paddingTop: 40,
          }}>
          Explore
        </Text>
      </View>
      <HouseTypeTabs />
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}></View>
            {isHousesDataSuccess ? (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 50,
                  paddingLeft: 20,
                  width: width,
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={housesData.houses}
                renderItem={({item}) => (
                  <View style={styles.detailsHouseList}>
                    <HouseLists house={item} />
                  </View>
                )}
              />
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  // alignItems="center"
                  style={{paddingLeft: 20}}>
                  <ScrollView>
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                  </ScrollView>
                  {/* <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={120} height={20} />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item> */}
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}></View>
            {/* <ScrollView> */}
            {isHousesDataSuccess ? (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 50,
                  paddingLeft: 20,
                  width: width,
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={housesData.houses}
                renderItem={({item}) => (
                  <View style={styles.detailsHouseList}>
                    <HouseLists house={item} />
                  </View>
                )}
              />
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  // alignItems="center"
                  style={{paddingLeft: 20}}>
                  <ScrollView>
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                  </ScrollView>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
            {/* </ScrollView> */}
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}></View>
            {isHousesDataSuccess ? (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 50,
                  paddingLeft: 20,
                  width: width,
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={housesData.houses}
                renderItem={({item}) => (
                  <View style={styles.detailsHouseList}>
                    <HouseLists house={item} />
                  </View>
                )}
              />
            ) : (
              <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  // alignItems="center"
                  style={{paddingLeft: 20}}>
                  <ScrollView>
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - 50}
                      height={155}
                      borderRadius={10}
                      style={{marginTop: 20}}
                    />
                  </ScrollView>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
          </>
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  houseTabContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  houseTabElement: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.grey,
    borderStyle: 'solid',
    width: width / 3 - 15,
  },
  houseTabElementActive: {
    backgroundColor: COLORS.green,
  },
  activeCategoryListText: {
    color: COLORS.green,
    borderBottomWidth: 1,
    borderColor: COLORS.green,
    paddingBottom: 3,
  },
  detailExploreContainer: {
    paddingVertical: 5,
    paddingBottom: 100,
  },
  detailsHouseList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailsHouse: {
    width: width / 2 - 30,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 15,
  },
  cardDivider: {
    marginVertical: 5,
    height: 0.7,
    marginHorizontal: 15,
    backgroundColor: COLORS.dividerColor,
  },
});
