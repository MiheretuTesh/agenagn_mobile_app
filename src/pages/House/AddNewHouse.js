import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
  StatusBar,
  TextInput,
  Button,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RadioButtonRN from 'radio-buttons-react-native';

import ArrowLeft from 'react-native-vector-icons/MaterialIcons';

import {Dropdown} from 'react-native-element-dropdown';
import COLORS from '../../constants/colors';
import house from '../../constants/houses';
import DatePicker from './DatePicker';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const radioBtnData = [
  {
    label: 'Yes',
  },
  {
    label: 'No',
  },
];
const AddNewHouse = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocused, setIsFocused] = useState({
    location: false,
    bedNo: false,
    floor: false,
    rent: false,
    phoneNo: false,
    date: false,
    image: false,
    guest: false,
    description: false,
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const handleInputFocus = textInput => {
    setIsFocused({[textInput]: true});
  };
  const handleInputBlur = textInput => {
    setIsFocused({[textInput]: false});
  };

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    hideDateTimePicker();
  };

  const openImagePicker = () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 6,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(resp => {
        resp.map(image => {
          imageList.push({
            filename: image.filename,
            path: image.path,
            data: image.data,
          });
        });
        setImages(imageList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AddHouseForm = () => {
    return <View></View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.blue} />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 30,
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ArrowLeft name="arrow-back-ios" size={18} color={COLORS.dark} />
              <Text
                style={{fontSize: 16, fontWeight: '500', color: COLORS.dark}}>
                Back
              </Text>
            </View>
          </Pressable>
          <Text style={{fontSize: 16, fontWeight: '500', color: COLORS.dark}}>
            New House
          </Text>
          <View>
            <Text style={{color: COLORS.white}}>Hellowe</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.dark}}>
            Add New House
          </Text>
        </View>
        <View style={styles.form}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.location ? COLORS.green : COLORS.grey,
              padding: 5,
              borderRadius: 10,
              marginVertical: 15,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={{
                color: isFocused.location ? COLORS.green : COLORS.grey,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: isFocused.location ? COLORS.green : COLORS.grey,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {color: isFocused.location ? COLORS.green : COLORS.grey},
              ]}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter the location"
              placeholderTextColor={COLORS.green}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => handleInputFocus('location')}
              onBlur={() => handleInputBlur('location')}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.bedNo ? COLORS.green : COLORS.grey,
              padding: 5,
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={{
                color: isFocused.bedNo ? COLORS.green : COLORS.grey,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: isFocused.bedNo ? COLORS.green : COLORS.grey,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {color: isFocused.bedNo ? COLORS.green : COLORS.grey},
              ]}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter the Number of Bed Room"
              placeholderTextColor={COLORS.green}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => handleInputFocus('bedNo')}
              onBlur={() => handleInputBlur('bedNo')}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.floor ? COLORS.green : COLORS.grey,
              padding: 5,
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={{
                color: isFocused.floor ? COLORS.green : COLORS.grey,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: isFocused.floor ? COLORS.green : COLORS.grey,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {color: isFocused.floor ? COLORS.green : COLORS.grey},
              ]}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter the floor of the House"
              placeholderTextColor={COLORS.green}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => handleInputFocus('floor')}
              onBlur={() => handleInputBlur('floor')}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.rent ? COLORS.green : COLORS.grey,
              padding: 5,
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={{
                color: isFocused.rent ? COLORS.green : COLORS.grey,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: isFocused.rent ? COLORS.green : COLORS.grey,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {color: isFocused.rent ? COLORS.green : COLORS.grey},
              ]}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter the amount of monthly rent fee"
              placeholderTextColor={COLORS.green}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => handleInputFocus('rent')}
              onBlur={() => handleInputBlur('rent')}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.phoneNo ? COLORS.green : COLORS.grey,
              padding: 5,
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={{
                color: isFocused.phoneNo ? COLORS.green : COLORS.grey,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: isFocused.phoneNo ? COLORS.green : COLORS.grey,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {color: isFocused.phoneNo ? COLORS.green : COLORS.grey},
              ]}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.green}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => handleInputFocus('phoneNo')}
              onBlur={() => handleInputBlur('phoneNo')}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused.date ? COLORS.green : COLORS.grey,
              padding: 5,
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View>
            <TextInput
              onFocus={() => {
                handleInputFocus('date');
                showDateTimePicker();
              }}
              onBlur={() => handleInputBlur('date')}
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="What is the day it will be available"
              placeholderTextColor={isFocused.date ? COLORS.green : COLORS.grey}
            />
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={handleDatePicked}
              onCancel={hideDateTimePicker}
            />
          </View>
          <View>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text>Upload Image</Text>
            </View>
            <Pressable
              onPress={() => {
                openImagePicker();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: isFocused.image ? COLORS.green : COLORS.grey,
                  padding: 5,
                  marginVertical: 15,
                  marginTop: 0,
                  borderRadius: 10,
                  height: 100,
                }}>
                {images.length === 0 ? (
                  <>
                    <View>
                      <LocationIcon
                        name="location"
                        size={25}
                        color={COLORS.green}
                      />
                    </View>
                    <Text>upload image...</Text>
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                    }}>
                    {images.map((img, index) => (
                      <Image
                        source={{uri: img.path}}
                        style={{width: 50, height: 50}}
                        key={index}
                      />
                    ))}
                  </View>
                )}
              </View>
            </Pressable>
          </View>
          <View>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text>Is It Guest House?</Text>
            </View>
            <RadioButtonRN
              style={{
                flexDirection: 'row',
              }}
              boxStyle={{
                width: 80,
                marginRight: 10,
                height: 40,
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                margin: 0,
              }}
              data={radioBtnData}
              selectedBtn={e => console.log(e)}
              circleSize={15}
              textStyle={{fontSize: 15, marginTop: -10, marginLeft: 10}}
              boxActiveBgColor={COLORS.green}
              activeColor={COLORS.white}
            />
          </View>

          <View
            style={{
              padding: 5,
              paddingBottom: 0,
              marginBottom: 5,
            }}></View>
          <View>
            <View style={{padding: 5, paddingBottom: 0, marginBottom: 5}}>
              <Text>Short Description</Text>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  handleInputFocus('description');
                }}
                onBlur={() => handleInputBlur('description')}
                editable
                multiline
                numberOfLines={4}
                onChangeText={text => setDescription(text)}
                value={description}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: isFocused.description
                    ? COLORS.green
                    : COLORS.grey,
                  borderRadius: 5,
                }}
                placeholder="Write Description"
                placeholderTextColor={
                  isFocused.description ? COLORS.green : COLORS.grey
                }
              />
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginVertical: 15,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  borderRadius: 8,
                  marginRight: 15,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
                  <Text style={{fontSize: 16, color: COLORS.white}}>
                    Save as Draft
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  borderRadius: 8,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
                  <Text style={{fontSize: 16, color: COLORS.white}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewHouse;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  form: {
    margin: 30,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 0.75,
    borderRadius: 5,
    borderColor: COLORS.transparent,
  },
  dropdown: {
    width: '90%',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
