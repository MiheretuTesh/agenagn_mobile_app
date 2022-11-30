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

export const storeAdmin = async admin => {
  try {
    await AsyncStorage.setItem('admin', admin);
    return true;
  } catch (err) {
    console.log(err, 'Error Saving the admin');
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

export const getAdmin = async () => {
  try {
    const admin = await AsyncStorage.getItem('admin');

    return admin;
  } catch (err) {
    console.log(err, 'Error getting admin');
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('admin');
  } catch (err) {
    console.log(err, 'Error while logout');
  }
};
