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
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Tab, TabView} from '@rneui/themed';
import {SharedElement} from 'react-navigation-shared-element';
import COLORS from '../../constants/colors';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopNavigationContainer from '../../components/layout/TopNavigationContainer';
import {ScrollView} from 'react-native-gesture-handler';
import AddIcon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import houseUpload from '../../constants/houseUploaded';

import {getToken} from '../../utils/db-service';
import {TokenDecode} from '../../utils/token.decode';
import config from '../../constants/config.keys';

import {getUserData} from '../../features/dashboard/dashboard.Slice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('screen');

const UploadHouse = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    uploadedHousesData,
    uploadedHousesLoading,
    uploadedHousesSuccess,
    uploadedHousesFail,
    uploadedHouseErrorMsg,
  } = useSelector(state => state.dashboard);

  const {
    createHouseLoading,
    createHouseSuccess,
    createHouseFailed,
    updateHouseLoading,
    updateHouseSuccess,
    updateHouseFail,
  } = useSelector(state => state.houses);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getUserData());
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState('');
  const [uploadHousesData, setUploadHouseData] = useState({});

  useEffect(() => {
    if (uploadedHousesData) {
      if (index === 0 && uploadedHousesSuccess == true) {
        setUploadHouseData(uploadedHousesData.user.Houses);
      }
      if (index === 1 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Active',
        );
        setUploadHouseData(houses);
      }
      if (index === 2 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Submitted',
        );
        setUploadHouseData(houses);
      }
      if (index === 3 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Draft',
        );
        setUploadHouseData(houses);
      }
    }
  }, [uploadedHousesSuccess]);

  useEffect(() => {
    if (uploadedHousesData) {
      if (index === 0 && uploadedHousesSuccess == true) {
        setUploadHouseData(uploadedHousesData.user.Houses);
      }
      if (index === 1 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Active',
        );
        setUploadHouseData(houses);
      }
      if (index === 2 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Submitted',
        );
        setUploadHouseData(houses);
      }
      if (index === 3 && uploadedHousesSuccess == true) {
        let houses = uploadedHousesData.user.Houses.filter(
          house => house.listingStatus === 'Draft',
        );
        setUploadHouseData(houses);
      }
    }
  }, [uploadedHousesSuccess, index]);

  const onLayoutChange = event => {
    const {width, height} = event.nativeEvent.layout;
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

    setOrientation(orientation);
  };

  const HouseTypeTabs = () => {
    return (
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
          title={<Text style={{color: COLORS.dark}}>Active</Text>}
          titleStyle={{fontSize: 11}}
          buttonStyle={{backgroundColor: COLORS.white}}
          containerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <Tab.Item
          title={<Text style={{color: COLORS.dark}}>Submitted</Text>}
          titleStyle={{fontSize: 11}}
          buttonStyle={{backgroundColor: COLORS.white}}
          containerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        <Tab.Item
          title={<Text style={{color: COLORS.dark}}>Draft</Text>}
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
      <Pressable
        onPress={() =>
          navigation.push('UploadedHouseDetailScreen', {
            house: house,
            email: uploadedHousesData.user.email,
          })
        }>
        <View style={styles.houseCard}>
          <Image
            source={{
              uri: `${config.BASE_URI}/images/${uploadedHousesData.user.email}/${uploadedHousesData.user.email}${house.images[0]}`,
            }}
            style={styles.houseImg}
          />
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View>
              <Text
                style={{
                  color: COLORS.green,
                  fontWeight: '500',
                  fontSize: 15,
                }}>
                {house.location}
              </Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Monthly Rent: {house.monthlyPayment}Br
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: COLORS.grey,
                  fontSize: 13,
                  fontWeight: '500',
                }}>
                Location: {house.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: COLORS.dark}}>Status: </Text>
              <View
                style={{
                  elevation: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor:
                    house.listingStatus === 'Draft'
                      ? COLORS.draftStatus
                      : house.listingStatus === 'Submitted'
                      ? COLORS.submitStatus
                      : house.listingStatus === 'Active'
                      ? COLORS.activeStatus
                      : '',
                  borderRadius: 5,
                }}>
                <Text style={{color: COLORS.dark}}>{house.listingStatus}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardDivider}></View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 5,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: 30,
              }}>
              <Text style={{color: COLORS.dark}}>Bed Room: </Text>
              <BedIcon
                name="bed-king"
                size={25}
                style={{paddingRight: 3}}
                color={COLORS.uploadTextColor}
              />
              <Text style={{color: COLORS.dark, fontWeight: '500'}}>
                {house.bedNo}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.dark}}>Area: </Text>
              <RectangleIcon
                name="rectangle-outline"
                size={29}
                style={{paddingRight: 0}}
                color={COLORS.uploadTextColor}
              />
              <Text style={{color: COLORS.dark, fontWeight: '500'}}>
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

      <TopNavigationContainer
        navigation={navigation}
        title={'Review Houses'}
        isLogged={false}
      />

      <View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 40,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: COLORS.dark,
              }}>
              Uploaded
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.addHouseColor,
              padding: 8,
              borderRadius: 10,
            }}>
            <AddIcon
              name="pluscircleo"
              size={22}
              color={COLORS.green}
              style={{marginRight: 10}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewHouseScreen')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: COLORS.dark,
                }}>
                Add New House
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <HouseTypeTabs />
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <>
            {uploadedHousesSuccess ? (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 50,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                showsVerticalScrollIndicator={false}
                data={uploadHousesData}
                renderItem={({item}) => (
                  <View style={styles.houseContainer}>
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
            {/* <ScrollView> */}
            <FlatList
              contentContainerStyle={{paddingBottom: 50, paddingLeft: 20}}
              showsVerticalScrollIndicator={false}
              data={uploadHousesData}
              renderItem={({item}) => (
                <View style={styles.houseContainer}>
                  <HouseLists house={item} />
                </View>
              )}
            />
            {/* </ScrollView> */}
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <FlatList
              contentContainerStyle={{paddingBottom: 50, paddingLeft: 20}}
              showsVerticalScrollIndicator={false}
              data={uploadHousesData}
              renderItem={({item}) => (
                <View style={styles.houseContainer}>
                  <HouseLists house={item} />
                </View>
              )}
            />
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <FlatList
              contentContainerStyle={{
                paddingBottom: 50,
                paddingLeft: 20,
                width: width,
              }}
              showsVerticalScrollIndicator={false}
              data={uploadHousesData}
              renderItem={({item}) => (
                <View style={styles.houseContainer}>
                  <HouseLists house={item} />
                </View>
              )}
            />
          </>
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

export default UploadHouse;

const styles = StyleSheet.create({
  container: {paddingTop: 5, flex: 1, backgroundColor: COLORS.white},
  houseTabContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  activeCategoryListText: {
    color: COLORS.green,
    borderBottomWidth: 1,
    borderColor: COLORS.green,
    paddingBottom: 3,
  },
  detailsHouseList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  houseContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  houseCard: {
    height: 270,
    width: width - 40,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 15,
  },
  houseImg: {
    width: '100%',
    height: 140,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardDivider: {
    marginVertical: 3,
    height: 1,
    marginHorizontal: 15,
    backgroundColor: COLORS.dividerColor,
  },
});
