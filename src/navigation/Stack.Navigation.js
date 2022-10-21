import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Home from '../pages/Home/Home';
import Details from '../pages/Details/Details';
import Filter from '../pages/Home/Filter';

import Explore from '../pages/Explore/Explore';
import Saved from '../pages/Saved/Saved';

import UploadHouse from '../pages/House/UploadHouse';
import UploadHouseLanding from '../pages/House/UploadHouseLanding';
import EditHouse from '../pages/House/EditHouse';
import HouseDetails from '../pages/House/HouseDetails';
import AddNewHouse from '../pages/House/AddNewHouse';

import Profile from '../pages/Profile/Profile';
import EditProfile from '../pages/Profile/EditProfile';

import Login from '../pages/Authentication/Login';
import SignUp from '../pages/Authentication/SignUp';
import ForgetPassword from '../pages/Authentication/ForgetPassword';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Detail"
        component={Details}
        navigationOptions={() => {
          return {
            tabBarVisible: false,
          };
        }}
      />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
  );
};

export const ExploreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Detail" component={Details} />
    </Stack.Navigator>
  );
};

export const SavedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="Detail" component={Details} />
    </Stack.Navigator>
  );
};

export const UploadStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Upload" component={UploadHouseLanding} />
      <Stack.Screen name="UploadedHouseDetail" component={HouseDetails} />
      <Stack.Screen name="AddNewHouse" component={AddNewHouse} />
      <Stack.Screen name="EditHouse" component={EditHouse} />
    </Stack.Navigator>
  );
};

export const AuthUploadStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Upload" component={UploadHouse} />
      <Stack.Screen name="UploadedHouseDetail" component={HouseDetails} />
      <Stack.Screen name="AddNewHouse" component={AddNewHouse} />
      <Stack.Screen name="EditHouse" component={EditHouse} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Register" component={SignUp} />
    </Stack.Navigator>
  );
};
