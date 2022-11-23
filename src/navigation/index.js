import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {AuthDrawer, AppDrawer} from './Drawer.Navigation';

/// redux actions

import {getAllHouses} from '../features/house/house.Slice';

const Navigation = ({tokenData}) => {
  const {isLoginSuccess} = useSelector(state => state.auth);

  console.log(isLoginSuccess, 'isLoginSuccess isLoginSuccess isLoginSuccess');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHouses());
  }, []);

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
