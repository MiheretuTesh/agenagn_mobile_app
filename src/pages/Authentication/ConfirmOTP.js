import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Button,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import React, {useState, useEffect, useRef} from 'react';
import AntDHomeIcon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../features/auth/auth.Slice';
import auth from '@react-native-firebase/auth';

import COLORS from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
const ConfirmOTP = ({navigation, route}) => {
  const {confirm, phoneNumber} = route.params;
  const [confirmData, setConfirmData] = useState(confirm ? confirm : null);
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const phoneInput = useRef(null);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmpty, setIsEmpty] = useState(false);

  const onAuthStateChanged = user => {
    console.log(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (confirmData !== null) {
      console.log(confirmData);
      const formData = {phoneNumber: confirmData.phoneNumber};
      dispatch(loginUser(formData));
      console.log('Hello');
    }
  }, [confirmData]);

  const [emailError, setEmailError] = useState({
    isError: false,
    errorMsg: '',
  });

  const {
    isLoginFetching,
    isLoginSuccess,
    loginData,
    isLoginError,
    loginErrorMessage,
  } = useSelector(state => state.auth);

  const handleOtpCode = value => {
    setCode(value);
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (email !== '' && password !== '' && emailError !== true) {
      setIsEmpty(false);

      const formData = {email: email, password: password};
      dispatch(loginUser(formData));
      // navigation.navigate('Home');
    } else {
      setIsEmpty(true);
      if (email === '' && password === '') {
      }
      if (email === '') {
      } else {
      }
    }
  };

  const confirmCode = async () => {
    console.log(code);
    try {
      const confirmOtp = await confirmData.confirm(code);

      console.log(confirmOtp, 'Confirmed');
    } catch (error) {
      console.log('Invalid code.', error);
    }
  };

  if (loginData !== '') {
    navigation.navigate('Home');
  } else {
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
              <Text
                style={{color: COLORS.dark, fontSize: 26, fontWeight: '500'}}>
                Confirm your number
              </Text>
              <Text
                style={{color: COLORS.grey, fontSize: 15, fontWeight: '400'}}>
                Enter the code we sent over SMS to 0{phoneNumber}:
              </Text>
              {isLoginError ? (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    paddingTop: 30,
                  }}>
                  <Text style={{color: COLORS.red, fontSize: 12}}>
                    Confirmation Number is not correct
                  </Text>
                </View>
              ) : (
                ''
              )}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  paddingTop: 0,
                }}>
                <View style={styles.phoneNumberOtpContainer}>
                  <TextInput
                    style={{
                      height: 40,
                      width: width / 2 + 70,
                      margin: 12,
                      borderWidth: 1,
                      borderColor:
                        emailError.isError && email ? COLORS.red : COLORS.green,
                      padding: 10,
                      color: COLORS.dark,
                    }}
                    onChangeText={text => setCode(text)}
                    value={code}
                    placeholder="Enter your confirmation code"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="numeric"
                  />
                  <View style={[styles.loginBtn, {marginTop: 15}]}>
                    <TouchableOpacity onPress={() => confirmCode()}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: 18,
                          fontWeight: '500',
                        }}>
                        Confirm Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <View style={{flexDirection: 'row', paddingTop: 12}}>
                <Text style={{color: COLORS.dark}}>Didn’t have account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: COLORS.green}}>Register here</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ConfirmOTP;

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
    paddingTop: 10,
    elevation: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
  },
  phoneNumberOtpContainer: {
    paddingTop: 20,
  },
  forgetPasswordTxt: {
    margin: 12,
    color: COLORS.green,
    marginTop: 0,
    fontSize: 11,
  },
  input: {
    height: 40,
    width: width / 2 + 70,
    margin: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: 10,
    color: COLORS.dark,
  },
  loginBtn: {
    margin: 0,
    marginHorizontal: 12,
    width: width / 2 + 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
