import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/store';
import {Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const [tokenData, setTokenData] = useState(null);
  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setTokenData(token);
      return token;
    } catch (err) {
      console.log(err, 'Error while trying to get token');
    }
  };

  useEffect(() => {
    isLoggedIn();
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
      {/* {tokenData && <Navigation tokenData={tokenData} />}
      {<Navigation />} */}
      <Navigation tokenData={tokenData} />
      {/* </NavigationContainer> */}
    </Provider>
  );
};

export default App;
