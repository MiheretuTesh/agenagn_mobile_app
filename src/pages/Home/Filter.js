import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import COLORS from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');

const Filter = ({navigation}) => {
  const [priceNo, setPriceNo] = useState([5000, 100000]);
  const [area, setArea] = useState([50, 1000]);

  const priceSliderChangeHandler = values => setPriceNo(values);
  const areaSliderChangeHandler = values => setArea(values);

  const HouseTabs = () => {
    const [selectedHouseTypeIndex, setSelectedHouseTypeIndex] = useState(0);
    const [index, setIndex] = useState(0);

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

  const BedRoom = () => {
    const [selectedBedRoom, setSelectedBedRoom] = useState(0);

    const bedRoomList = ['Any', 'Studio', '1', '2', '3', '3+'];

    return (
      <View style={styles.houseTabContainer}>
        {bedRoomList.map((bed, index) => (
          <Pressable key={index} onPress={() => setSelectedBedRoom(index)}>
            <View
              style={[
                styles.bedTabElement,
                index === selectedBedRoom && styles.bedTabElementActive,
              ]}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 13,
                  color: index === selectedBedRoom ? COLORS.white : COLORS.dark,
                }}>
                {bed}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="close-circle-outline"
              size={25}
              color={COLORS.dark}
            />
          </Pressable>
          <Text style={{color: COLORS.dark, fontSize: 18}}>Filter</Text>
          <Text style={{color: COLORS.green}}>Reset</Text>
        </View>
        <View style={styles.apartmentsContainer}>
          <Text>House Type</Text>
          <HouseTabs />
        </View>
        <View style={styles.viewContainer}>
          <Text>Price (monthly)</Text>
          <View style={styles.labelWrapper}>
            <Text style={{fontSize: 15}}>{priceNo[0]} - </Text>
            <Text style={{fontSize: 15}}>{priceNo[1]} Br</Text>
          </View>
          <MultiSlider
            markerStyle={{
              ...Platform.select({
                ios: {
                  height: 10,
                  width: 10,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 1,
                  shadowOpacity: 0.1,
                },
                android: {
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                  backgroundColor: COLORS.grey,
                  borderColor: COLORS.green,
                  borderWidth: 2,
                },
              }),
            }}
            pressedMarkerStyle={{
              ...Platform.select({
                android: {
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  backgroundColor: COLORS.green,
                },
              }),
            }}
            selectedStyle={{
              backgroundColor: COLORS.green,
            }}
            trackStyle={{
              backgroundColor: COLORS.grey,
            }}
            touchDimensions={{
              height: 30,
              width: 30,
              borderRadius: 20,
              slipDisplacement: 30,
            }}
            values={[priceNo[0], priceNo[1]]}
            sliderLength={340}
            onValuesChange={priceSliderChangeHandler}
            min={5000}
            max={100000}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
          />
        </View>
        <View style={styles.apartmentsContainer}>
          <Text>Bed Room Number</Text>
          <BedRoom />
        </View>
        <View style={styles.viewContainer}>
          <Text>Area (sqrt)</Text>
          <View style={styles.labelWrapper}>
            <Text style={{fontSize: 15}}>{area[0]} - </Text>
            <Text style={{fontSize: 15}}>{area[1]} Sqrt</Text>
          </View>
          <MultiSlider
            markerStyle={{
              ...Platform.select({
                ios: {
                  height: 10,
                  width: 10,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 1,
                  shadowOpacity: 0.1,
                },
                android: {
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                  backgroundColor: COLORS.grey,
                  borderColor: COLORS.green,
                  borderWidth: 2,
                },
              }),
            }}
            pressedMarkerStyle={{
              ...Platform.select({
                android: {
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  backgroundColor: COLORS.green,
                },
              }),
            }}
            selectedStyle={{
              backgroundColor: COLORS.green,
            }}
            trackStyle={{
              backgroundColor: COLORS.grey,
            }}
            touchDimensions={{
              height: 30,
              width: 30,
              borderRadius: 20,
              slipDisplacement: 30,
            }}
            values={[area[0], area[1]]}
            sliderLength={340}
            onValuesChange={areaSliderChangeHandler}
            min={50}
            max={100}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.contactBtn}>
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: '500'}}>
              Show Property
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white, paddingTop: 10},
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  viewContainer: {
    alignSelf: 'center',
  },

  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // paddingVertical: 20,
  },
  apartmentsContainer: {paddingVertical: 20, marginHorizontal: 20},
  houseTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
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
  bedTabElement: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.grey,
    borderStyle: 'solid',
    width: width / 6 - 15,
  },
  bedTabElementActive: {
    backgroundColor: COLORS.green,
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
