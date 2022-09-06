import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MenuBarIcon from 'react-native-vector-icons/Entypo';

const TopNavigationContainer = ({
  navigation,
  title,
  isLogged,
  color = '#333333',
}) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <MenuBarIcon name="menu" size={25} color={color} />
      </TouchableOpacity>
      {/* <Text style={styles.cardText}>{title}</Text> */}
      <Text></Text>
    </View>
  );
};

export default TopNavigationContainer;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    width: '100%',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.transparent,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: COLORS.dark,
  },
});
