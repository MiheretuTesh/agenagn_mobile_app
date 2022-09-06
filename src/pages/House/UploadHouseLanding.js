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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <TopNavigationContainer
        navigation={navigation}
        title={'Upload'}
        isLogged={false}
      />
      <View style={styles.houseUploadContainer}>
        <Image
          source={require('../../assets/uploadHouse.png')}
          style={styles.uploadImg}
        />
        <View style={{paddingHorizontal: 50}}>
          <Text style={{fontSize: 26, textAlign: 'center'}}>
            Create An Account and upload House
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center'}}>
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
                style={{
                  backgroundColor: COLORS.green,
                  padding: 10,
                  borderRadius: 10,
                  color: COLORS.white,
                  fontSize: 18,
                  textAlign: 'center',
                }}>
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
});
