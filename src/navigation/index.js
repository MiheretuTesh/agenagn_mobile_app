import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import UploadIcon from 'react-native-vector-icons/Feather';
// log-out

const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const HomeScreenTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // tabBarActiveTintColor: '#1a3c43',
          // tabBarInactiveTintColor: '#1a3c43',
          // tabBarActiveBackgroundColor: 'white',
          // tabBarInactiveBackgroundColor: COLORS.green,

          tabBarHideOnKeyboard: true,

          // tabBarstyle: {
          //   backgroundColor: '#333',
          //   paddingBottom: 3,
          //   paddingHorizontal: 50,
          // },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
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
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
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
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={Saved}
          options={{
            headerShown: false,
            tabBarLabel: ({focused, color}) => (
              <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
                Saved
              </Text>
            ),

            tabBarIcon: ({focused, size}) => (
              <SaveIcon
                name="hearto"
                color={focused ? COLORS.green : COLORS.grey}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadHouseLanding}
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
                Upload
              </Text>
            ),

            tabBarIcon: ({focused}) => (
              <UploadIcon
                name="upload"
                color={focused ? COLORS.green : COLORS.grey}
                size={30}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Upload"
          component={UploadHouse}
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
                Upload
              </Text>
            ),

            tabBarIcon: ({focused}) => (
              <UploadIcon
                name="upload"
                color={focused ? COLORS.green : COLORS.grey}
                size={30}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="HomeScreen" component={Home} />
        <Drawer.Screen name="AboutScreen" component={About} />
      </Drawer.Navigator>
    );
  };

  const HomeScreenNavigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="SignUpScreen" component={SignUp} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="SearchScreen" component={Search} />
          <Stack.Screen name="SavedScreen" component={Saved} />
          <Stack.Screen name="ExploreScreen" component={Explore} />
          <Stack.Screen name="DetailsScreen" component={Details} />
        </Stack.Navigator>
      </>
    );
  };
  const DetailsScreenNavigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="DetailsScreen" component={Details} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="SignUpScreen" component={SignUp} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="SearchScreen" component={Search} />
          <Stack.Screen name="SavedScreen" component={Saved} />
          <Stack.Screen name="ExploreScreen" component={Explore} />
        </Stack.Navigator>
      </>
    );
  };
  const ExploreScreenNavigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ExploreScreen" component={Explore} />
          <Stack.Screen name="DetailsScreen" component={Details} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="SignUpScreen" component={SignUp} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="SearchScreen" component={Search} />
          <Stack.Screen name="SavedScreen" component={Saved} />
        </Stack.Navigator>
      </>
    );
  };
  const SavedScreenNavigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SavedScreen" component={Saved} />
          <Stack.Screen name="ExploreScreen" component={Explore} />
          <Stack.Screen name="DetailsScreen" component={Details} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="SignUpScreen" component={SignUp} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="SearchScreen" component={Search} />
        </Stack.Navigator>
      </>
    );
  };
  const ProfileScreenNavigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="SavedScreen" component={Saved} />
          <Stack.Screen name="ExploreScreen" component={Explore} />
          <Stack.Screen name="DetailsScreen" component={Details} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="SignUpScreen" component={SignUp} />
          <Stack.Screen name="SearchScreen" component={Search} />
        </Stack.Navigator>
      </>
    );
  };
  const BasicNavigation = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTab" component={HomeScreenTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SinghUp" component={SignUp} />
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPassword} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Saved" component={Saved} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen
          name="DetailsScreen"
          component={Details}
          // sharedElements={route => {
          //   return [route?.params?.house.id];
          // }}
        />
        <Stack.Screen name="AddNewHouseScreen" component={AddNewHouse} />
        <Stack.Screen name="HouseDetailsScreen" component={HouseDetails} />
        <Stack.Screen name="EditHouseScreen" component={EditHouse} />
        <Stack.Screen name="EditProfileScreen" component={EditProfile} />
        <Stack.Screen name="FilterScreen" component={Filter} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
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
          name="Home "
          component={BasicNavigation}
          options={{
            drawerIcon: ({color}) => (
              <HomeIcon name="home" color={color} size={22} />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({color}) => (
              <ProfileIcon
                name="person-circle-outline"
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About "
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
              <AboutIcon
                name="md-information-circle-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="LoginScreen"
          component={Login}
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
          name="RegisterScreen"
          component={SignUp}
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
      </Drawer.Navigator>
      {/* <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreenNavigation}
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
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreenNavigation}
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
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreenNavigation}
          options={{
            headerShown: false,
            tabBarLabel: ({focused, color}) => (
              <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
                Saved
              </Text>
            ),

            tabBarIcon: ({focused, size}) => (
              <SaveIcon
                name="hearto"
                color={focused ? COLORS.green : COLORS.grey}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreenNavigation}
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? COLORS.green : COLORS.grey}}>
                Profile
              </Text>
            ),

            tabBarIcon: ({focused}) => (
              <ProfileIcon
                name="person-circle-outline"
                color={focused ? COLORS.green : COLORS.grey}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
