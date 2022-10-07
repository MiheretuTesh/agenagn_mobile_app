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
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const UploadHouseLanding = ({navigation}) => {
  const [orientation, setOrientation] = useState('');

  const onLayoutChange = event => {
    const {width, height} = event.nativeEvent.layout;
    console.log(width, height, 'Orientation');
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

    setOrientation(orientation);
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutChange}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <TopNavigationContainer
        navigation={navigation}
        title={'Upload'}
        isLogged={false}
      />
      <View style={styles.houseUploadContainer}>
        <Image
          source={require('../../assets/uploadHouse.png')}
          style={
            orientation === 'PORTRAIT' ? styles.uploadImg : styles.uploadImg1
          }
        />
        <View style={{paddingHorizontal: 50, color: COLORS.uploadTextColor}}>
          <Text
            style={
              orientation === 'PORTRAIT'
                ? styles.uploadHeroTxt
                : styles.uploadHeroTxt1
            }>
            Create An Account and upload House
          </Text>
          <Text
            style={
              orientation === 'PORTRAIT'
                ? styles.uploadBottomTxt
                : styles.uploadBottomTxt1
            }>
            Create An Account and upload House
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
              <Text
                style={
                  orientation === 'PORTRAIT'
                    ? styles.createAccountBtn
                    : styles.createAccountBtn1
                }>
                Create Account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadHouseLanding;

const styles = StyleSheet.create({
  container: {paddingTop: 5, flex: 1, backgroundColor: COLORS.white},
  houseUploadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImg: {
    width: 300,
    height: 300,
  },
  uploadImg1: {
    width: 180,
    height: 180,
  },
  uploadHeroTxt: {
    fontSize: 26,
    textAlign: 'center',
    color: COLORS.uploadTextColor,
  },
  uploadHeroTxt1: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.uploadTextColor,
  },

  uploadBottomTxt: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.uploadTextColor,
  },
  uploadBottomTxt1: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.uploadTextColor,
  },
  createAccountBtn: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 10,
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
  },
  createAccountBtn1: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 10,
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
