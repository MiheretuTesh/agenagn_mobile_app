import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopNavigationContainer from '../../components/layout/TopNavigationContainer';
import COLORS from '../../constants/colors';
import houseUpload from '../../constants/houseUploaded';
import AddIcon from 'react-native-vector-icons/AntDesign';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const UploadHouse = ({navigation}) => {
  const HouseTypeTabs = ({navigation}) => {
    const [selectedHouseTypeIndex, setSelectedHouseTypeIndex] = useState(0);
    const houseTypeList = ['All', 'Active', 'Submitted', 'Draft'];
    return (
      <View
        style={{
          width: width - 20,
          flexDirection: 'row',
          justifyContent: 'center',
          // margin,
        }}>
        <View style={styles.houseTabContainer}>
          {houseTypeList.map((house, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedHouseTypeIndex(index)}>
              <Text
                style={[
                  styles.categoryListText,
                  index === selectedHouseTypeIndex &&
                    styles.activeCategoryListText,
                ]}>
                {house}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const HouseLists = ({house}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('HouseDetailsScreen', house)}>
        <View style={styles.houseCard}>
          <Image source={house.images[0]} style={styles.houseImg} />
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
                {house.title}
              </Text>
              <Text
                style={{
                  color: COLORS.dark,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Monthly Rent: {house.price}Br
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
                  padding: 5,
                  backgroundColor:
                    house.status === 'Draft'
                      ? COLORS.draftStatus
                      : house.status === 'Submit'
                      ? COLORS.submitStatus
                      : house.status === 'Active'
                      ? COLORS.activeStatus
                      : '',
                  borderRadius: 5,
                }}>
                <Text style={{color: COLORS.dark}}>{house.status}</Text>
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
              // justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: 30,
              }}>
              <Text>Bed Room: </Text>
              {/* <BedIcon name="bed-king" size={25} style={{paddingRight: 3}} /> */}
              {/* <Text>Bed-</Text> */}
              <Text>{house.bedNo}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text>Area: </Text>
              {/* <RectangleIcon
                name="rectangle-outline"
                size={29}
                style={{paddingRight: 0}}
              /> */}
              <Text>{house.area}sqrt</Text>
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
        title={'Review Houses'}
        isLogged={false}
      />
      <View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingTop: 40,
          }}>
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
        <HouseTypeTabs />
        <FlatList
          contentContainerStyle={{paddingBottom: 200}}
          showsVerticalScrollIndicator={false}
          data={houseUpload}
          renderItem={({item}) => (
            <View style={styles.houseContainer}>
              <HouseLists house={item} />
            </View>
          )}
        />
      </View>
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
    width: '70%',
  },
  activeCategoryListText: {
    color: COLORS.green,
    borderBottomWidth: 1,
    borderColor: COLORS.green,
    paddingBottom: 3,
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