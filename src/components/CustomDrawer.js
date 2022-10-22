import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DevSettings,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../constants/colors';
import LogoutIcon from 'react-native-vector-icons/SimpleLineIcons';
import ShareIcon from 'react-native-vector-icons/Feather';
import MenuBar from '../assets/MenuBar.svg';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../features/auth/auth.Slice';
import Navigation from '../navigation';
import RNRestart from 'react-native-restart'; // Import package from node modules
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const dispatch = useDispatch();

  const [isToken, setIsToken] = useState(null);

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setTokenData(token);
      return token;
    } catch (err) {
      console.log(err, 'Error while trying to get token');
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={{flex: 1, padding: 0, margin: 0, paddingTop: 0}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: 0}}>
        {props.token !== null ? (
          <View
            style={{
              height: 170,
              padding: 20,
              paddingTop: 0,
              marginTop: 0,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: COLORS.green,
              border: 'none',
            }}>
            <Image
              source={require('../assets/profile.jpg')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                border: 'none',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  paddingTop: 10,
                  fontSize: 16,
                }}>
                Name: &nbsp;
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  paddingTop: 10,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Abebe Birhanu
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  paddingTop: 10,
                  fontSize: 16,
                }}>
                Email: &nbsp;
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: COLORS.white,
                  paddingTop: 10,
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: 170,
                }}>
                abebebirhanu@gmail.com
              </Text>
            </View>
          </View>
        ) : (
          ''
        )}

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ShareIcon name="share-2" size={23} color={COLORS.dark} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: COLORS.dark,
              }}>
              Share
            </Text>
          </View>
        </TouchableOpacity>

        {props.token !== null ? (
          <TouchableOpacity
            onPress={() => {
              // props.stateUserLoggedIn(false);
              dispatch(logoutUser());
              // Immediately reload the React Native Bundle
              RNRestart.Restart();
              // DevSettings.reload();

              console.log('Logout CLICKED');
              props.navigation.navigate('Home');
            }}
            style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LogoutIcon name="logout" size={23} color={COLORS.dark} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color: COLORS.dark,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
