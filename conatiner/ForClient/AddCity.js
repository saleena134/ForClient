import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNewCity} from '../redux/action';

const AddCity = () => {
  // storing new city name in redux
  const {newCityName} = useSelector(state => state.reducer);

  const dispatch = useDispatch();

  const handleSubmit = val => {
    val.preventDefault();
    if (newCityName === '') {
      alert('Enter name');
    } else {
      alert('Successfully store in redux!!');
      dispatch(getNewCity(newCityName));
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Enter City Name"
        onChangeText={newCityName => dispatch(getNewCity(newCityName))}
        style={styles.inputContainer}
      />
      <Button title="Add City" onPress={handleSubmit} />
    </View>
  );
};

export default AddCity;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    marginVertical: 15,
  },
});
