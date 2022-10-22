import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHousesDataForNonLoginUser,
  getHousesDataLoginUser,
} from '../features/dashboard/dashboard.Slice';
import {NavigationContainer} from '@react-navigation/native';

import {AuthDrawer, AppDrawer} from './Drawer.Navigation';

const Navigation = ({tokenData}) => {
  const [userLoggedIn, stateUserLoggedIn] = useState(false);

  const {isLoginSuccess} = useSelector(state => state.auth);

  console.log(isLoginSuccess, 'isLoginSuccess isLoginSuccess isLoginSuccess');

  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenData !== null) {
      dispatch(getHousesDataLoginUser(token));
    } else {
      dispatch(getHousesDataForNonLoginUser());
    }
  }, [tokenData]);

  const {token} = useSelector(state => state.houses);

  return (
    <NavigationContainer>
      {tokenData !== null || isLoginSuccess === true ? (
        <AuthDrawer token={tokenData} isLoginSuccess={isLoginSuccess} />
      ) : (
        <AppDrawer token={tokenData} isLoginSuccess={isLoginSuccess} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
