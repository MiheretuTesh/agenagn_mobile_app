import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
    return true;
  } catch (err) {
    console.log(err, 'Error Saving the token');
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log(token, 'token successfully saved');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err, 'Error getting token');
  }
};
