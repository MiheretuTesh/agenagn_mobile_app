import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import COLORS from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BathIcon from 'react-native-vector-icons/FontAwesome5';
import RectangleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditIcon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('screen');
const SPACING = 15;

const HouseDetails = ({navigation, route}) => {
  const house = route.params;
  const safeInsets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState(0);

  const HouseCarouselImg = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <ScrollView>
        <View style={styles.houseDetailContainer}>
          <View style={styles.houseDetailHeader}>
            <Animated.View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
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
              <Pressable
                onPress={() => navigation.navigate('EditHouseScreen', house)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.green,
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    borderRadius: 8,
                  }}>
                  <EditIcon name="edit" size={18} color={COLORS.white} />
                  <Text style={{color: COLORS.white, marginLeft: 3}}>Edit</Text>
                </View>
              </Pressable>
            </Animated.View>
            {/* <SharedElement id={house.id}> */}
            <Image
              source={house.images[selectedImage]}
              style={styles.postImage}
            />
            {/* </SharedElement> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                position: 'absolute',
                top: 155,
              }}>
              <HouseCarouselImg />
            </View>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View>
              <Animated.Text
                style={{
                  fontSize: 16,
                  color: COLORS.green,
                  fontWeight: 'bold',
                }}>
                {house.title}
              </Animated.Text>
              <Animated.Text
                style={{
                  fontSize: 18,
                  color: COLORS.dark,
                  fontWeight: '500',
                }}>
                Price: {house.price}Br/mo
              </Animated.Text>
              <Animated.Text
                style={{
                  fontSize: 14,
                  color: COLORS.locationColor,
                  fontWeight: '500',
                }}>
                Location: {house.location}
              </Animated.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Text
                style={{
                  fontSize: 15,
                  color: COLORS.dark,
                  fontWeight: '500',
                }}>
                Status:
              </Animated.Text>
              <Animated.View
                style={{
                  backgroundColor: COLORS.submitStatus,
                  paddingVertical: 3,
                  paddingHorizontal: 6,
                  marginLeft: 3,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.locationColor,
                    fontWeight: '500',
                    color: COLORS.dark,
                  }}>
                  Submit
                </Text>
              </Animated.View>
            </View>
          </View>
          <Animated.View style={styles.horizontalDivider}></Animated.View>
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
                {house.phone}
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
                <Text
                  style={{paddingRight: 3, color: COLORS.dark, fontSize: 16}}>
                  Description
                </Text>
                <Text
                  style={{paddingRight: 3, color: COLORS.dark, fontSize: 15}}>
                  {house.description}
                </Text>
              </View>
            </Animated.View>
          </View>

          <Animated.View style={styles.horizontalDivider}></Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HouseDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  houseDetailContainer: {},
  postImage: {
    height: 220,
    width: '100%',
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
