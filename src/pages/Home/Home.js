import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  TextInput,
  Dimensions,
  Pressable,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import {SharedElement} from 'react-navigation-shared-element';
import React, {useState} from 'react';
import COLORS from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterIcon from 'react-native-vector-icons/Feather';
import ForwardArrowIcon from 'react-native-vector-icons/MaterialIcons';
import house from '../../constants/houses';
import TopNavigationContainer from '../../components/layout/TopNavigationContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState('');

  const onLayoutChange = event => {
    const {width, height} = event.nativeEvent.layout;
    // console.log(width, height, 'Orientation');
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

    setOrientation(orientation);
  };

  const HouseTabs = () => {
    const [selectedHouseTypeIndex, setSelectedHouseTypeIndex] = useState(0);

    const houseListTypes = [
      {
        title: 'Apartments',
        icon: (
          <MaterialCommunityIcons
            name="home-city"
            size={15}
            color={selectedHouseTypeIndex === 0 ? COLORS.white : COLORS.dark}
          />
        ),
      },
      {
        title: 'Condominium',
        icon: (
          <MaterialIcons
            name="apartment"
            size={15}
            color={selectedHouseTypeIndex === 1 ? COLORS.white : COLORS.dark}
          />
        ),
      },
      {
        title: 'Villa',
        icon: (
          <FontAwesome5
            name="home"
            size={15}
            color={selectedHouseTypeIndex === 2 ? COLORS.white : COLORS.dark}
          />
        ),
      },
    ];
    return (
      <View style={styles.houseTabContainer}>
        {houseListTypes.map((house, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedHouseTypeIndex(index)}>
            <View
              style={[
                styles.houseTabElement,
                index === selectedHouseTypeIndex &&
                  styles.houseTabElementActive,
              ]}>
              {house.icon}
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 13,
                  color:
                    index === selectedHouseTypeIndex
                      ? COLORS.white
                      : COLORS.dark,
                }}>
                {house.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  const HouseTabsTwo = () => {
    const [selectedHouseTypeIndex, setSelectedHouseTypeIndex] = useState(0);
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
      // </View>
    );
  };

  const HouseList = ({house}) => {
    return (
      <Pressable onPress={() => navigation.push('Detail', house)}>
        <View
          style={
            orientation == 'LANDSCAPE'
              ? styles.cardContainer2
              : styles.cardContainer1
          }>
          <SharedElement id={house.id}>
            <Image source={house.images[0]} style={styles.cardImage} />
          </SharedElement>
          <View style={{flex: 1}}>
            <Text
              style={{color: COLORS.green, fontWeight: 'bold', fontSize: 13}}>
              {house.title}
            </Text>
            <Text style={{color: COLORS.dark, fontSize: 15, fontWeight: '500'}}>
              Monthly Rent: {house.price}Br
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{color: COLORS.grey, fontSize: 11}}>
              Location: {house.location}
            </Text>
            <View style={styles.cardDivider}></View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingRight: 5,
                }}>
                <Text
                  style={{color: COLORS.dark, fontSize: 13, fontWeight: '400'}}>
                  Bed Room:{' '}
                </Text>
                {/* <BedIcon name="bed-king" size={25} style={{paddingRight: 3}} /> */}
                <Text
                  style={{color: COLORS.dark, fontSize: 13, fontWeight: '500'}}>
                  {house.bedNo}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: COLORS.dark, fontSize: 13, fontWeight: '400'}}>
                  Area:{' '}
                </Text>
                {/* <RectangleIcon
                  name="rectangle-outline"
                  size={25}
                  style={{paddingRight: 3}}
                /> */}
                <Text
                  style={{color: COLORS.dark, fontSize: 13, fontWeight: '500'}}>
                  {house.area}sqrt
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutChange}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <View style={styles.header}>
        <TopNavigationContainer
          navigation={navigation}
          title={'Home'}
          isLogged={false}
          color={COLORS.white}
        />
        <ImageBackground
          source={require('../../assets/heroImg2.jpg')}
          resizeMode="cover"
          style={styles.headerBackgroundImg}>
          <View style={styles.headerTop}>
            <Entypo name="home" size={30} color={COLORS.white} />
            <View style={styles.headerTitle}>
              <Text
                style={{color: COLORS.red, fontSize: 20, fontWeight: '500'}}>
                A
              </Text>
              <Text
                style={{color: COLORS.white, fontSize: 20, fontWeight: '500'}}>
                genagn
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.headerSearchSection}>
              <Icon
                name="search"
                size={20}
                color={COLORS.grey}
                style={{marginHorizontal: 5}}
              />
              <TextInput
                placeholder="search address, city, location"
                placeholderTextColor={COLORS.grey}
                style={styles.headerSearchBar}
              />
            </View>

            <View
              style={{
                backgroundColor: COLORS.dark,
                padding: 5,
                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                <FilterIcon name="sliders" size={25} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <HouseTabsTwo />
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}>
              <Text style={{color: COLORS.grey}}>Featured Listings</Text>
            </View>
            {/* <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              showsVerticalScrollIndicator={false}
              data={house}
              renderItem={({item}) => (
                <View style={styles.detailsHouseList}>
                  <HouseList house={item} />
                </View>
              )}
            /> */}
            <ScrollView style={{width: width}}>
              <View
                style={
                  orientation == 'LANDSCAPE'
                    ? styles.detailsHouseList2
                    : styles.detailsHouseList1
                }>
                {house.map((item, index) => (
                  <HouseList house={item} key={index} />
                ))}
              </View>
              <View style={{height: 100}}></View>
            </ScrollView>
          </>
        </TabView.Item>

        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}>
              <Text style={{color: COLORS.grey}}>Featured Listings</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text>See All</Text>
                <ForwardArrowIcon name="keyboard-arrow-right" size={20} />
              </View>
            </View>
            <ScrollView style={{width: width}}>
              <View
                style={
                  orientation == 'LANDSCAPE'
                    ? styles.detailsHouseList2
                    : styles.detailsHouseList1
                }>
                {house.map((item, index) => (
                  <HouseList house={item} key={index} />
                ))}
                <View style={{height: 100}}></View>
              </View>
              <View style={{height: 100}}></View>
            </ScrollView>
          </>
        </TabView.Item>
        <TabView.Item>
          <>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width - 25,
              }}>
              <Text style={{color: COLORS.grey}}>Featured Listings</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text>See All</Text>
                <ForwardArrowIcon name="keyboard-arrow-right" size={20} />
              </View>
            </View>
            <ScrollView style={{width: width}}>
              <View
                style={
                  orientation == 'LANDSCAPE'
                    ? styles.detailsHouseList2
                    : styles.detailsHouseList1
                }>
                {house.map((item, index) => (
                  <HouseList house={item} key={index} />
                ))}
                <View style={{height: 100}}></View>
              </View>
              <View style={{height: 100}}></View>
            </ScrollView>
          </>
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  headerBackgroundImg: {
    paddingHorizontal: 10,
    paddingTop: 30,
    height: 150,
    elevation: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  headerTop: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerSearchSection: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerSearchBar: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    color: COLORS.grey,
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
  categoryListText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.grey,
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
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  detailsHouseList1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  detailsHouseList2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginRight: 60,
    marginLeft: 20,
  },

  cardContainer1: {
    height: 155,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 50,
    paddingLeft: 5,
    paddingRight: 5,

    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  cardContainer2: {
    height: 145,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width / 2 - 100,
    marginRight: 60,
    // width: width - 50,
    paddingLeft: 5,
    paddingRight: 5,

    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  cardImage: {
    width: 150,
    height: 140,
    borderRadius: 15,
    marginRight: 10,
  },
  cardDivider: {
    marginVertical: 5,
    height: 0.7,
    width: '100%',
    marginHorizontal: 'auto',
    backgroundColor: COLORS.dividerColor,
  },
});
