import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

import ArrowLeft from 'react-native-vector-icons/MaterialIcons';

import config from '../../constants/config.keys';
import {Dropdown} from 'react-native-element-dropdown';
import COLORS from '../../constants/colors';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getToken} from '../../utils/db-service';
import axios from 'axios';

import {updateHouse} from '../../features/house/house.Slice';

const {width, height} = Dimensions.get('screen');

const locationData = [
  {
    label: 'Ayat Condominium',
    value: 'Ayat Condominium',
  },
  {label: 'Jemo Condominium', value: 'Jemo Condominium'},
  {label: 'Mebrat Condominium', value: 'Mebrat Condominium'},
  {label: 'Ledeta Condominium', value: 'Ledeta Condominium'},
  {label: '4k Condominium', value: '4k Condominium'},
  {label: '6K Condominium', value: '6k Condominium'},
  {label: 'Saris Condominium', value: 'Saris Condominium'},
  {label: 'Meskel Condominium', value: 'Meskel Condominium'},
];

const bedData = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
];

const floorData = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
];

const squareMeter = [
  {label: '4 x 4', value: '4 x 4'},
  {label: '3 x 4', value: '3 x 4'},
  {label: '5 x 4', value: '5 x 4'},
  {label: '5 x 3', value: '5 x 3'},
];

const EditHouse = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {house, email} = route.params;

  console.log(house, 'Edit House Data');

  const [images, setImages] = useState(house.images);
  const [imagesEdit, setImagesEdit] = useState(null);
  const [imageNames, setImageNames] = useState([]);
  const [houseImageUpdated, setImageUpdated] = useState(false);

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const [location, setLocation] = useState(house.location);
  const [bedNo, setBedNo] = useState(house.bedNo);
  const [floor, setFloor] = useState(house.floor);
  const [monthlyPayment, setMonthlyPayment] = useState(house.monthlyPayment);
  const [phoneNumber, setPhoneNumber] = useState(house.phoneNumber);
  const [available, setAvailable] = useState(house.availabilityDate);
  const [isGuestHouse, setIsGuestHouse] = useState(house.guestHouse);
  const [description, setDescription] = useState(house.description);

  const toggleSwitch = () => setIsGuestHouse(previousState => !previousState);

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

  const handleInputFocus = textInput => {
    setIsFocused({[textInput]: true});
  };
  const handleInputBlur = textInput => {
    setIsFocused({[textInput]: false});
  };

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = date => {
    setAvailable(moment(date).format('YYYY-MM-DD'));
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = date => {
    setAvailable(moment(date).format('YYYY-MM-DD'));
    hideDateTimePicker(date);
  };

  const openImagePicker12 = () => {
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

  const openImagePicker = () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [DocumentPicker.types.allFiles],
      waitAnimationEnd: false,
      compressImageQuality: 0.8,
      maxFiles: 6,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(resp => {
        setImages(resp);
        setImagesEdit(resp);
        setImageUpdated(true);
        resp.map(image => {
          console.log(image.name);
          imageNames.push(image.name);
        });
      })
      .catch(err => {
        setImageUpdated(false);
        setImages([]);
        setImageNames([]);
        if (DocumentPicker.isCancel(err)) {
          alert('Canceled');
        } else {
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      });
  };

  const formSubmit = () => {
    const imagesNames = imageNames.toString();

    const data = new FormData();
    let formData;
    if (houseImageUpdated) {
      formData = {
        location: location,
        bedNo: bedNo,
        floor: floor,
        monthlyPayment: monthlyPayment,
        phoneNumber: phoneNumber,
        availabilityDate: available,
        images: imagesNames,
        guestHouse: isGuestHouse,
        description: description,
        houseId: house.id,
        houseImageUpdated: houseImageUpdated,
        // listingStatus: e.target.value,
        // reviewStatus: 'NA',
      };
    } else {
      formData = {
        location: location,
        bedNo: bedNo,
        floor: floor,
        monthlyPayment: monthlyPayment,
        phoneNumber: phoneNumber,
        availabilityDate: available,
        // images: imagesNames,
        guestHouse: isGuestHouse,
        description: description,
        houseId: house.id,
        houseImageUpdated: houseImageUpdated,
        // listingStatus: e.target.value,
        // reviewStatus: 'NA',
      };
    }

    images.forEach(image => {
      data.append('files[]', image);
    });

    data.append('files[]', images);

    dispatch(updateHouse(formData));

    handleImageUpload(data);
  };

  const handleImageUpload = async imageData => {
    const token = await getToken();

    await axios.post(
      `${config.BASE_URI}/api/v1/houses/uploadHouseImages`,
      imageData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token ? `Bearer ${token}` : null,
        },
      },
    );
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: '500', color: COLORS.dark}}>
            Edit House
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
            Edit House
          </Text>
        </View>
        <View style={styles.form}>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Location</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.location ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              {/* <View>
              <LocationIcon name="location" size={25} color={COLORS.green} />
            </View> */}
              <Dropdown
                containerStyle={{color: 'black'}}
                baseColor="#333"
                style={[
                  {backgroundColor: 'dark'},
                  styles.dropdown,
                  // isFocus && {borderColor: 'blue'},
                  // {color: COLORS.dark},
                ]}
                placeholderStyle={{
                  color: isFocused.location ? COLORS.green : COLORS.grey,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: isFocused.location ? COLORS.green : COLORS.dark,
                }}
                inputSearchStyle={[
                  styles.inputSearchStyle,
                  {color: isFocused.location ? COLORS.green : COLORS.dark},
                ]}
                // selectedTextStyle={{
                //   fontSize: 13,
                //   color: 'black',
                // }}

                iconColor="black"
                // iconStyle={{width: 36, height: 36}}
                iconStyle={styles.iconStyle}
                data={locationData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Enter the location"
                placeholderTextColor={COLORS.green}
                searchPlaceholder="Search..."
                value={location}
                onFocus={() => handleInputFocus('location')}
                onBlur={() => handleInputBlur('location')}
                onChange={item => {
                  setLocation(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Bed Room Number</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.bedNo ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              {/* <View>
                <LocationIcon name="location" size={25} color={COLORS.green} />
              </View> */}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={{
                  color: isFocused.bedNo ? COLORS.green : COLORS.grey,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: isFocused.bedNo ? COLORS.green : COLORS.dark,
                }}
                inputSearchStyle={[
                  styles.inputSearchStyle,
                  {color: isFocused.bedNo ? COLORS.green : COLORS.dark},
                ]}
                iconStyle={styles.iconStyle}
                data={bedData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Enter Number of Bed Rooms"
                placeholderTextColor={COLORS.green}
                searchPlaceholder="Search..."
                value={bedNo.toString()}
                onFocus={() => handleInputFocus('bedNo')}
                onBlur={() => handleInputBlur('bedNo')}
                onChange={item => {
                  setBedNo(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Floor</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.floor ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={{
                  color: isFocused.floor ? COLORS.green : COLORS.grey,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: isFocused.floor ? COLORS.green : COLORS.dark,
                }}
                inputSearchStyle={[
                  styles.inputSearchStyle,
                  {color: isFocused.floor ? COLORS.green : COLORS.dark},
                ]}
                iconStyle={styles.iconStyle}
                data={floorData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Enter floor"
                placeholderTextColor={COLORS.green}
                searchPlaceholder="Search..."
                value={floor.toString()}
                onFocus={() => handleInputFocus('floor')}
                onBlur={() => handleInputBlur('floor')}
                onChange={item => {
                  setFloor(item.value);
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Monthly Rent</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.phoneNo ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  handleInputFocus('monthlyPayment');
                }}
                onBlur={() => handleInputBlur('monthlyPayment')}
                editable
                // multiline
                onChangeText={phone => setMonthlyPayment(phone)}
                value={monthlyPayment.toString()}
                style={{
                  borderWidth: 0,
                  borderColor: isFocused.description
                    ? COLORS.green
                    : COLORS.grey,
                  borderRadius: 5,
                  color: COLORS.dark,
                }}
                placeholder="Enter Monthly Rent Fee"
                placeholderTextColor={
                  isFocused.description ? COLORS.green : COLORS.grey
                }
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Phone Number</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.phoneNo ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  handleInputFocus('phoneNumber');
                }}
                onBlur={() => handleInputBlur('phoneNumber')}
                editable
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
                style={{
                  borderWidth: 0,
                  borderColor: isFocused.description
                    ? COLORS.green
                    : COLORS.grey,
                  borderRadius: 5,
                  color: COLORS.dark,
                }}
                placeholder="Enter your phone number"
                placeholderTextColor={
                  isFocused.description ? COLORS.green : COLORS.grey
                }
              />
            </View>
          </View>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Available Date</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isFocused.date ? COLORS.green : COLORS.grey,
                padding: 5,
                borderRadius: 10,
              }}>
              <Text
                style={[styles.input, {color: COLORS.grey}]}
                onPress={() => showDateTimePicker()}>
                {available ? available : 'Available for rent stating from'}
              </Text>
              <DateTimePicker
                value={available}
                isVisible={isDateTimePickerVisible}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Upload Image</Text>
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
                    <Text style={{color: COLORS.dark}}>upload image...</Text>
                  </>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                    }}>
                    {imagesEdit !== null
                      ? imagesEdit.map((img, index) => (
                          <Image
                            source={{uri: img.uri}}
                            style={{width: 50, height: 50}}
                            key={index}
                          />
                        ))
                      : images.map((img, index) => (
                          <Image
                            source={{
                              uri: `${config.BASE_URI}/images/${email}/${email}${img}`,
                            }}
                            style={{width: 50, height: 50}}
                            key={index}
                          />
                        ))}
                  </View>
                )}
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 5,
              }}>
              <Text style={{color: COLORS.dark}}>Is It Guest House?</Text>
            </View>
            <Switch
              trackColor={{false: COLORS.grey, true: COLORS.green}}
              thumbColor={isGuestHouse ? COLORS.green : COLORS.grey}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isGuestHouse}
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
              <Text style={{color: COLORS.dark}}>Short Description</Text>
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
                  color: COLORS.dark,
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{fontSize: 16, color: COLORS.white}}>
                    Cancel Review
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: COLORS.green,
                  borderRadius: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('UploadScreen')
                    formSubmit();
                  }}>
                  <Text
                    style={{fontSize: 16, color: COLORS.white}}
                    value="Pending">
                    Update Details
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

export default EditHouse;

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
    width: '100%',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    display: 'none',
    height: 40,
    fontSize: 16,
  },
});
