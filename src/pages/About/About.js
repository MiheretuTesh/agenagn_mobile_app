import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import AntDHomeIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';

const {width, height} = Dimensions.get('screen');
const About = ({navigation}) => {
  const [number, onChangeNumber] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <ScrollView>
        <View style={styles.loginContainer}>
          <View style={styles.loginTop}>
            <AntDHomeIcon name="home" size={80} color={COLORS.white} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.letterColor, fontSize: 40}}>A</Text>
              <Text style={{color: COLORS.white, fontSize: 40}}>genagn</Text>
            </View>
          </View>
          <View style={styles.loginBottom}>
            <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: '400'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet
              lorem odio rutrum morbi. Adipiscing convallis adipiscing sit quam
              viverra lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sem amet lorem odio rutrum morbi. Adipiscing convallis
              adipiscing sit quam viverra lectus. Learn More...Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sem amet lorem odio rutrum
              morbi. Adipiscing convallis adipiscing sit quam viverra lectus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet
              lorem odio rutrum morbi. Adipiscing convallis adipiscing sit quam
              viverra lectus. Learn More...
            </Text>
          </View>
          <View style={{position: 'absolute', top: 20, zIndex: 1, padding: 10}}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="close-circle-outline"
                size={30}
                color={COLORS.white}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
  },
  loginContainer: {
    height: height,
    width: width,
  },
  loginTop: {
    fle: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 3,
    elevation: 10,
  },
  loginBottom: {
    paddingTop: 20,
    height: 100,
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  input: {
    height: 50,
    width: width / 2 + 70,
    margin: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: 10,
  },
});
