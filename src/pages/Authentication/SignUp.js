import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import React, {useState, useEffect, useRef} from 'react';
import AntDHomeIcon from 'react-native-vector-icons/AntDesign';
import COLORS from '../../constants/colors';
import GoogleIcon from 'react-native-vector-icons/AntDesign';
import FacebookIcon from 'react-native-vector-icons/Entypo';
import {loginUser} from '../../features/auth/auth.Slice';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

const {width, height} = Dimensions.get('screen');
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [photo, setPhoto] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onAuthStateChanged = user => {
    setUser(user);
    setPhoneNumber(user?.phoneNumber);
    console.log(user, 'Confirm User Data');
    if (user) {
      setLoggedIn(true);
      const formData = {phoneNumber: user.phoneNumber};
      dispatch(loginUser(formData));
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: null,
      offlineAccess: false,
    });
  }, []);

  const [emailError, setEmailError] = useState({
    isError: false,
    errorMsg: '',
  });

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    console.log(confirmation, 'Sing With Phone Authentication');

    if (confirmation.phoneNumber) {
      const formData = {phoneNumber: phoneNumber};
      dispatch(loginUser(formData));
    } else {
      navigation.navigate('ConfirmScreen', {
        confirm: confirmation,
        phoneNumber: value,
        phone: phoneNumber,
      });
    }
  };

  const _signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleSign = await GoogleSignin.signIn();
      console.log(googleSign, 'Email SignIn');
      setConfirm(googleSign.user.email);
      setEmail(googleSign.user.email);
      setName(googleSign.user.name);
      setPhoto(googleSign.user.photo);
      setUser(googleSign.user);

      console.log(email, name, photo, 'User Data Google SignIn');

      setLoggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
      }
    }
  };

  if (email !== '') {
    const formData = {email: email, name: name, photo: photo};
    dispatch(loginUser(formData));
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          alert('Your are signed out!');
        });
      setLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

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
            <Text style={{color: COLORS.dark, fontSize: 22, fontWeight: '400'}}>
              Log in or sign up to Agenagn
            </Text>

            {/* {isLoginError ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  paddingTop: 30,
                }}>
                <Text style={{color: COLORS.red, fontSize: 12}}>
                  Email or Password is not correct
                </Text>
              </View>
            ) : (
              ''
            )} */}
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                paddingTop: 0,
              }}>
              <View style={styles.phoneNumberOtpContainer}>
                <PhoneInput
                  containerStyle={{borderWidth: 0.5, paddingVertical: 0}}
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="ET"
                  layout="first"
                  onChangeText={text => {
                    setValue(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  withShadow
                  // autoFocus
                />

                <View style={[styles.loginBtn, {marginTop: 20}]}>
                  <TouchableOpacity
                    onPress={() => {
                      signInWithPhoneNumber(formattedValue);
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Confirm Phone Number
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: width - 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 30,
                  }}>
                  <View
                    style={{
                      borderWidth: 0.25,
                      width: width / 2 - 50,
                    }}></View>
                  <Text style={{color: COLORS.dark}}> or </Text>
                  <View
                    style={{
                      borderWidth: 0.25,
                      width: width / 2 - 50,
                    }}></View>
                  <View></View>
                </View>

                <View style={{width: width - 80, flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 15,
                      padding: 10,
                    }}>
                    <View style={{color: COLORS.dark, width: '10%'}}>
                      <GoogleIcon name="google" size={16} color={COLORS.dark} />
                    </View>
                    <TouchableOpacity onPress={() => _signInGoogle()}>
                      <View
                        style={{
                          width: '95%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: COLORS.dark, fontSize: 16}}>
                          Continue with Google
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginVertical: 10}}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 15,
                      padding: 10,
                    }}>
                    <View style={{color: COLORS.dark, width: '10%'}}>
                      <FacebookIcon
                        name="facebook"
                        size={18}
                        color={COLORS.dark}
                      />
                    </View>
                    <TouchableOpacity onPress={() => _signInGoogle()}>
                      <View
                        style={{
                          width: '90%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: COLORS.dark, fontSize: 16}}>
                          Continue with Facebook
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
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
};

export default SignUp;

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
    // marginHorizontal: 12,
    width: width - 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
