import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import house from '../../constants/houses';
import COLORS from '../../constants/colors';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartIcon from 'react-native-vector-icons/Ionicons';
import TopNavigationContainer from '../../components/layout/TopNavigationContainer';

const {width} = Dimensions.get('screen');
const Saved = ({navigation}) => {
  const HouseTypeTabs = ({navigation}) => {
    const [selectedHouseTypeIndex, setSelectedHouseTypeIndex] = useState(0);
    const houseTypeList = ['All', 'Apartments', 'Condominium', 'Villa'];
    return (
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
    );
  };

  const HouseLists = ({house}) => {
    const [iconSelect, setIcon] = useState(true);
    return (
      <Pressable onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={styles.detailsHouse}>
          {/* <SharedElement id={index.id}> */}
          <Image
            source={house.images[0]}
            style={{
              width: '100%',
              height: 130,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          />
          {/* </SharedElement> */}
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
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
                Price: {house.price}Br
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
            <Pressable onPress={() => setIcon(!iconSelect)}>
              <View>
                <HeartIcon
                  name={iconSelect ? 'md-heart-sharp' : 'md-heart-outline'}
                  size={23}
                  color={iconSelect ? COLORS.red : COLORS.dark}
                />
              </View>
            </Pressable>
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
              {/* <BedIcon name="bed-king" size={25} style={{paddingRight: 3}} /> */}
              <Text>Bed: </Text>
              <Text>{house.bedNo}</Text>
              {/* <Text> Bed</Text> */}
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: 5,
              }}>
              <BathIcon name="bath" size={20} style={{paddingRight: 3}} />
              <Text>{house.bathNo}</Text>
            </View> */}
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
        title={'Saved'}
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
          Saved
        </Text>
      </View>
      <HouseTypeTabs />
      <FlatList
        // contentContainerStyle={{paddingLeft: 0}}
        showsVerticalScrollIndicator={false}
        data={house}
        renderItem={({item}) => (
          <View style={styles.detailsHouseList}>
            <HouseLists house={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;

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
    marginHorizontal: 40,
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
  detailsHouse: {
    width: width - 50,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardDivider: {
    marginVertical: 5,
    height: 0.7,
    marginHorizontal: 15,
    backgroundColor: COLORS.dividerColor,
  },
});
