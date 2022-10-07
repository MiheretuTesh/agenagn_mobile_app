import {Linking, Alert, Platform} from 'react-native';

const CallNumber = phone => {
  console.log('Phone Number', phone);

  let phoneNumber = phone;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  } else {
    phoneNumber = `telprompt:${phone}`;
  }

  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone Number is not supported');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export default CallNumber;
