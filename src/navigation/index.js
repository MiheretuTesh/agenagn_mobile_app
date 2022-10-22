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

  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenData !== null) {
      dispatch(getHousesDataLoginUser(token));
    } else {
      dispatch(getHousesDataForNonLoginUser());
    }
  }, []);

  const {token} = useSelector(state => state.houses);

  return (
    <NavigationContainer>
      {tokenData !== null ? (
        <AuthDrawer token={tokenData} />
      ) : (
        <AppDrawer token={tokenData} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
