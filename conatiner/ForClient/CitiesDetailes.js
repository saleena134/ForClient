import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

const CitiesDetailes = ({route}) => {
  const listing = route.params;
  const {title, id, url} = listing;
  const cityDetails = useSelector(state => state.reducer);
  const {newCityName} = useSelector(state => state.reducer);
  React.useEffect(() => {
    console.log('Entered New city name=====>', newCityName);
    console.log('City details=====>', cityDetails);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <View style={styles.cityImage}>
          <Image source={url} />
        </View>
        <View style={styles.cityDetailContainer}>
          <Text style={styles.textContainer}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Title</Text>{' '}
            {title}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>ID</Text> {id}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CitiesDetailes;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 500,
  },
  cityContainer: {
    backgroundColor: 'ebf5f4',
    padding: 10,
    marginVertical: 10,
  },
  CitiesDetailes: {flexDirection: 'column'},
  cityImage: {
    height: 300,
    width: 300,
    backgroundColor: 'pink',
  },
  textContainer: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
});
