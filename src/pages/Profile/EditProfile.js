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

const EditProfile = ({navigation}) => {
  const safeInsets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState(0);

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
                  style={{marginTop: -7}}
                  size={30}
                  color={COLORS.white}
                />
              </Pressable>
            </Animated.View>
            <Image
              source={require('../../assets/gradientBg.jpg')}
              style={styles.postImage}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                top: 110,
              }}>
              <Image
                source={require('../../assets/profile.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Text
                style={{
                  color: COLORS.dark,
                  fontSize: 18,
                  paddingTop: 5,
                  fontWeight: '500',
                }}>
                Abebe Birhanu
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Animated.View
              style={[
                styles.horizontalDivider,
                {marginTop: 100},
              ]}></Animated.View>
            <View style={styles.iconsContainer}>
              <Animated.View style={styles.iconsStyle}>
                <Text style={{paddingRight: 3, color: COLORS.dark}}>
                  Full Name
                </Text>
              </Animated.View>

              <Animated.View style={styles.iconsStyle}>
                <Text style={{paddingRight: 3, color: COLORS.dark}}>
                  Abebe Birhanu
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
                  0987785665{' '}
                </Text>
              </Animated.View>
            </View>
            <Animated.View style={styles.horizontalDivider}></Animated.View>
            <View style={styles.iconsContainer}>
              <Animated.View style={styles.iconsStyle}>
                <Text style={{paddingRight: 3, color: COLORS.dark}}>Email</Text>
              </Animated.View>
              <Animated.View style={styles.iconsStyle}>
                <Text style={{paddingRight: 3, color: COLORS.dark}}>
                  abebebirhanu@gmail.com
                </Text>
              </Animated.View>
            </View>
            <Animated.View style={styles.horizontalDivider}></Animated.View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                backgroundColor: COLORS.green,
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 10,
                elevation: 10,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Save
              </Text>
            </TouchableOpacity>
            <Animated.View style={styles.horizontalDivider}></Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  houseDetailContainer: {},
  postImage: {
    height: 160,
    width: '100%',
  },
  horizontalDivider: {
    height: 1.3,
    backgroundColor: COLORS.dividerColor,
    marginVertical: 10,
    marginHorizontal: 45,
  },
  iconsContainer: {
    paddingTop: 0,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 50,
  },
  iconsStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
