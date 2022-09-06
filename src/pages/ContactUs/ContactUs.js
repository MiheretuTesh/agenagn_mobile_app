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
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/SimpleLineIcons';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import TimeIcon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');
const ContactUs = ({navigation}) => {
  const [number, onChangeNumber] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <ScrollView>
        <View style={styles.loginContainer}>
          <View style={styles.loginTop}>
            <AntDHomeIcon name="home" size={80} color={COLORS.white} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.letterColor, fontSize: 40}}>A</Text>
              <Text style={{color: COLORS.white, fontSize: 40}}>genagn</Text>
            </View>
          </View>
          <View style={styles.loginBottom}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <LocationIcon
                name="location-outline"
                size={25}
                color={COLORS.green}
              />
              <Text style={{fontSize: 16}}>4 kilo, Addis Ababa</Text>
              <Text style={{fontSize: 16}}>Road to ICS office</Text>
              <Text style={{fontSize: 16}}>E-Class BLG</Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <PhoneIcon
                name="screen-smartphone"
                size={25}
                color={COLORS.green}
              />
              <Text style={{fontSize: 16}}>4 kilo, Addis Ababa</Text>
              <EmailIcon
                name="email"
                size={25}
                color={COLORS.green}
                style={{paddingTop: 10}}
              />
              <Text style={{fontSize: 16}}>Road to ICS office</Text>
              <Text style={{fontSize: 16}}>E-Class BLG</Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <TimeIcon name="md-time-outline" size={25} color={COLORS.green} />
              <Text style={{fontSize: 16}}>Monday - Friday</Text>
              <Text style={{fontSize: 16}}>9am - 5pm</Text>
              <Text style={{fontSize: 16}}>Saturday - Sunday</Text>
              <Text style={{fontSize: 16}}>9am - 1pm</Text>
            </View>
          </View>
          <View style={{position: 'absolute', top: 20, zIndex: 1, padding: 10}}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="close-circle-outline"
                size={30}
                color={COLORS.white}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loginContainer: {
    // height: height,
    width: width,
  },
  loginTop: {
    fle: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.green,

    alignItems: 'center',
    height: height / 3,
    elevation: 10,
  },
  loginBottom: {
    paddingTop: 20,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
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
