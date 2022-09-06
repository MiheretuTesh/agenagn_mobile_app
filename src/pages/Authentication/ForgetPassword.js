import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import AntDHomeIcon from 'react-native-vector-icons/AntDesign';
import COLORS from '../../constants/colors';

const {width, height} = Dimensions.get('screen');
const ForgetPassword = ({navigation}) => {
  const [number, onChangeNumber] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <ScrollView>
        <View style={styles.loginContainer}>
          <View style={styles.loginTop}>
            <AntDHomeIcon name="home" size={80} color={COLORS.white} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.letterColor, fontSize: 30}}>A</Text>
              <Text style={{color: COLORS.white, fontSize: 30}}>genagn</Text>
            </View>
          </View>
          <View style={styles.loginBottom}>
            <Text style={{color: COLORS.dark, fontSize: 25, fontWeight: '400'}}>
              Reset Your Password
            </Text>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                paddingTop: 20,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter your email"
                keyboardType="default"
              />
              <View
                style={{
                  margin: 12,
                  width: width / 2 + 70,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: COLORS.green,
                  paddingVertical: 10,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  Confirm
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 200}}>
              <Text style={{color: COLORS.dark}}>Didn’t have account? </Text>
              <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={{color: COLORS.green}}>Register here</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
  },
  loginContainer: {
    height: height,
    width: width,
  },
  loginTop: {
    fle: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 4,
  },
  loginBottom: {
    paddingTop: 20,
    elevation: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: 100,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: width / 2 + 70,
    margin: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: 10,
  },
});
