import {StyleSheet, Text, View, Button} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, {useState} from 'react';

const DatePicker = () => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

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

  return (
    <View
      style={{
        // paddingTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="Show DatePicker" onPress={showDateTimePicker} />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
