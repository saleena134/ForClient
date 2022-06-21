import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CityCard = ({title, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cityContainer}>
        <View style={styles.cityImage}>
          <Image source={image} />
        </View>
        <View style={styles.cityDetailContainer}>
          <Text style={styles.textContainer}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cityContainer: {
    backgroundColor: '#ebf5f4',
    marginVertical: 15,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
  },
  CityCard: {flexDirection: 'column'},
  cityImage: {
    height: 100,
    width: 100,
    backgroundColor: 'pink',
  },
  textContainer: {
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 10,
    height: 100,
    width: 150,
  },
});
