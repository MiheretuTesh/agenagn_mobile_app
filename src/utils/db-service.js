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

    return token;
  } catch (err) {
    console.log(err, 'Error getting token');
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (err) {
    console.log(err, 'Error while logout');
  }
};
