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
import {signupUser} from '../../features/auth/auth.Slice';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    isRegisterFetching,
    isRegisterSuccess,
    isRegisterError,
    registerData,
    registerErrorMessage,
  } = useSelector(state => state.auth);

  const [emailError, setEmailError] = useState({
    isError: false,
    errorMsg: '',
  });
  const [passwordMatchMsg, setPasswordMatchMsg] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const handleEmailChange = value => {
    setEmail(value);
  };

  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordMatchMsg('Password Does not much');
    } else {
      setPasswordMatchMsg('');
    }
  };

  const validateEmail = email => {
    if (reg.test(email) === false) {
      console.log('Email is Not correct');
      setEmailError({isError: true, errorMsg: 'Email is not correct'});
      return false;
    }
    setEmailError({isError: false, errorMsg: ''});
    return true;
  };
  const handleSubmit = () => {
    if (password === confirmPassword) {
      const formData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
      };

      dispatch(signupUser(formData));

      setPasswordMatchMsg('');

      setName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMatchMsg('Password Does not much');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <ScrollView>
        <View style={styles.loginContainer}>
          <View style={styles.loginTop}>
            <AntDHomeIcon name="home" size={60} color={COLORS.white} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.letterColor, fontSize: 30}}>A</Text>
              <Text style={{color: COLORS.white, fontSize: 30}}>genagn</Text>
            </View>
          </View>
          <View style={styles.loginBottom}>
            <Text style={{color: COLORS.dark, fontSize: 25, fontWeight: '400'}}>
              Create New Account
            </Text>
            <Text></Text>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                paddingTop: 10,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={handleNameChange}
                value={name}
                placeholder="Enter your Name"
                keyboardType="default"
                placeholderTextColor={COLORS.grey}
                required
              />
              <TextInput
                style={{
                  height: 40,
                  width: width / 2 + 70,
                  margin: 12,
                  borderWidth: 1,
                  borderColor: emailError.isError ? COLORS.red : COLORS.green,
                  padding: 10,
                  color: COLORS.dark,
                }}
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Enter your Email"
                keyboardType="default"
                placeholderTextColor={COLORS.grey}
                onBlur={() => {
                  if (reg.test(email) === false) {
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
              {emailError.isError ? (
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
              <TextInput
                style={styles.input}
                onChangeText={handlePhoneNumberChange}
                value={phoneNumber}
                placeholder="Enter your phone number"
                keyboardType="numeric"
                placeholderTextColor={COLORS.grey}
              />
              <TextInput
                style={{
                  height: 40,
                  width: width / 2 + 70,
                  margin: 12,
                  borderWidth: 1,
                  borderColor: passwordMatchMsg ? COLORS.red : COLORS.green,
                  padding: 10,
                  color: COLORS.dark,
                }}
                onChangeText={handlePasswordChange}
                value={password}
                placeholder="Enter your password"
                keyboardType="default"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={true}
              />
              {passwordMatchMsg ? (
                <Text
                  style={{
                    color: COLORS.red,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginRight: 12,
                    fontSize: 10,
                    marginTop: -10,
                  }}>
                  Password does not much
                </Text>
              ) : (
                ''
              )}
              <TextInput
                style={{
                  height: 40,
                  width: width / 2 + 70,
                  margin: 12,
                  borderWidth: 1,
                  borderColor: passwordMatchMsg ? COLORS.red : COLORS.green,
                  padding: 10,
                  color: COLORS.dark,
                }}
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                placeholder="Confirm your password"
                keyboardType="default"
                placeholderTextColor={COLORS.grey}
                error={passwordMatchMsg}
                secureTextEntry={true}
              />
              {passwordMatchMsg ? (
                <Text
                  style={{
                    color: COLORS.red,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginRight: 12,
                    fontSize: 10,
                    marginTop: -10,
                  }}>
                  Password does not much
                </Text>
              ) : (
                ''
              )}
              <View
                style={{
                  margin: 12,
                  width: width / 2 + 70,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  paddingVertical: 10,
                  borderRadius: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                      fontWeight: '500',
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <Text style={{color: COLORS.dark}}>
                Aleardy have an account?{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{color: COLORS.green}}>Login here</Text>
              </Pressable>
            </View>
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
    height: height / 4 - 40,
  },
  loginBottom: {
    paddingTop: 20,
    elevation: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: 50,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
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
});
