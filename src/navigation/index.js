import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import CustomDrawer from '../components/CustomDrawer';

// Screens
import Home from '../pages/Home/Home';
import Details from '../pages/Details/Details';
import Login from '../pages/Authentication/Login';
import SignUp from '../pages/Authentication/SignUp';
import Profile from '../pages/Profile/Profile';
import Search from '../pages/Search/Search';
import Saved from '../pages/Saved/Saved';
import Explore from '../pages/Explore/Explore';
import About from '../pages/About/About';
import UploadHouse from '../pages/House/UploadHouse';
import UploadHouseLanding from '../pages/House/UploadHouseLanding';
import EditHouse from '../pages/House/EditHouse';
import HouseDetails from '../pages/House/HouseDetails';
import AddNewHouse from '../pages/House/AddNewHouse';
import EditProfile from '../pages/Profile/EditProfile';
import ForgetPassword from '../pages/Authentication/ForgetPassword';
import Filter from '../pages/Home/Filter';
import ContactUs from '../pages/ContactUs/ContactUs';

//Icons
import HomeIcon from 'react-native-vector-icons/Octicons';
import ExploreIcon from 'react-native-vector-icons/Ionicons';
import SaveIcon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
import AboutIcon from 'react-native-vector-icons/Ionicons';
import ContactIcon from 'react-native-vector-icons/AntDesign';
import UploadIcon from 'react-native-vector-icons/Feather';
import LoginIcon from 'react-native-vector-icons/SimpleLineIcons';
// log-out

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => {
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

const ExploreStack = () => {
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

const SavedStack = () => {
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

const UploadStack = () => {
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

const ProfileStack = () => {
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

const LoginStack = () => {
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

const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Register" component={SignUp} />
      {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          display: 'flex',
        },
      }}>
      <Tab.Screen
        name="Home"
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
        name="Explore"
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
        name="Saved"
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
        name="Upload"
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

const Navigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          width: 290,
        },
        headerShown: false,
        drawerActiveBackgroundColor: '#3293A8',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <HomeIcon name="home" color={color} size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({color}) => (
            <ProfileIcon name="person-circle-outline" color={color} size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({color}) => (
            <AboutIcon
              name="md-information-circle-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: ({color}) => (
            <ContactIcon name="contacts" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginStack}
        options={{
          drawerIcon: ({color}) => (
            <LoginIcon name="login" color={color} size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterStack}
        options={{
          drawerIcon: ({color}) => (
            <LoginIcon name="login" color={color} size={26} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Navigation;
