import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MainStackNavigator,
  ExploreStack,
  SavedStack,
  UploadStack,
  AuthUploadStack,
} from './Stack.Navigation';
import COLORS from '../constants/colors';

//Icons
import HomeIcon from 'react-native-vector-icons/Octicons';
import ExploreIcon from 'react-native-vector-icons/Ionicons';
import SaveIcon from 'react-native-vector-icons/AntDesign';
import UploadIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

export const AppTabNavigation = props => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          display: 'flex',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <HomeIcon
              name="home"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Explore
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <ExploreIcon
              name="compass-outline"
              color={focused ? COLORS.green : COLORS.grey}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Saved
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <SaveIcon
              name="hearto"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UploadTab"
        component={UploadStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Upload
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <UploadIcon
              name="upload"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AuthTabNavigation = props => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          display: 'flex',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <HomeIcon
              name="home"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Explore
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <ExploreIcon
              name="compass-outline"
              color={focused ? COLORS.green : COLORS.grey}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Saved
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <SaveIcon
              name="hearto"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UploadTab"
        component={AuthUploadStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
              Upload
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) => (
            <UploadIcon
              name="upload"
              color={focused ? COLORS.green : COLORS.grey}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
