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
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../features/auth/auth.Slice';

import COLORS from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {getToken} from '../../utils/db-service';

// import {}

const {width, height} = Dimensions.get('screen');
const Login = ({navigation}) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmpty, setIsEmpty] = useState(false);

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

  // useEffect(() => {
  //   const token = getToken();
  //   if (token !== '') {
  //     navigation.navigate('Home');
  //   }
  // });

  // useEffect(() => {
  //   console.log(isLoginSuccess, loginData, isLoginError);
  //   if (isLoginSuccess === true) {
  //     navigation.navigate('Home');
  //   }
  // }, [isLoginSuccess]);

  const handleEmailChange = value => {
    setEmail(value);
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
                style={{color: COLORS.dark, fontSize: 25, fontWeight: '400'}}>
                Login to your account
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
                    Email or Password is not correct
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
                  onChangeText={handleEmailChange}
                  value={email}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  onBlur={() => {
                    if (reg.test(email.trim()) === false) {
                      console.log('Email is Not correct');
                      setEmailError({
                        isError: true,
                        errorMsg: 'Email is not correct',
                      });
                      return false;
                    }
                    setEmailError({isError: false, errorMsg: ''});
                    return true;
                  }}
                />
                {emailError.isError && email ? (
                  <Text
                    style={{
                      color: COLORS.red,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginRight: 12,
                      fontSize: 10,
                      marginTop: -10,
                    }}>
                    Email is Not Correct
                  </Text>
                ) : (
                  ''
                )}

                {isEmpty && email === '' ? (
                  <Text
                    style={{
                      color: COLORS.red,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginRight: 12,
                      fontSize: 10,
                      marginTop: -10,
                    }}>
                    Email is required
                  </Text>
                ) : (
                  ''
                )}
                <TextInput
                  style={styles.input}
                  onChangeText={handlePasswordChange}
                  value={password}
                  placeholder="Enter your password"
                  keyboardType="default"
                  placeholderTextColor={COLORS.grey}
                  secureTextEntry={true}
                />
                {isEmpty && password === '' ? (
                  <Text
                    style={{
                      color: COLORS.red,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginRight: 12,
                      fontSize: 10,
                      marginTop: -10,
                    }}>
                    Password is required
                  </Text>
                ) : (
                  ''
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text style={styles.forgetPasswordTxt}>Forgot password?</Text>
                </TouchableOpacity>

                <View style={styles.loginBtn}>
                  <TouchableOpacity onPress={onSubmit}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingTop: 12}}>
                <Text style={{color: COLORS.dark}}>Didn’t have account? </Text>
                <TouchableOpacity onPress={() => navigation.push('Register')}>
                  <Text style={{color: COLORS.green}}>Register here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Login;

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
