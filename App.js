import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import Navigation from './src/navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigation />;
};

export default App;
