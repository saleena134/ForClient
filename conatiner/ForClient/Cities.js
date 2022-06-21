import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import CitiesDetailes from './CitiesDetailes';
import CityCard from './CityCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCity, getNewCity} from '../redux/action';
import AddCity from './AddCity';

const Cities = () => {
  const [data, setData] = React.useState([]);
  const [wheather, setWheather] = React.useState({});
  const [location, setLocation] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    getCities();
    getWeatherApi();
  }, []);

  // city details
  const url = `https://jsonplaceholder.typicode.com/photos`;
  const getCities = async () => {
    try {
      const response = await axios.get(url);
      var carryData = response.data;
      setData(carryData);
      dispatch(getCity(carryData));
      console.log('checking response', response.data);
    } catch (error) {
      console.log('error here', error);
    }
  };

  // to see wheather
  const API_KEY = `ae9754f7eb49c310ea0a5deb0c4106ce`;

  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?${location}&appid=${API_KEY}`;

  const getWeatherApi = async event => {
    try {
      // if (event === 'Enter') {
      console.log('URL', weatherUrl);
      const WeatherResponse = await axios.get(weatherUrl);
      setWheather(WeatherResponse);
      console.log('weather report here', WeatherResponse);
      // }
    } catch (error) {
      console.log('error here', error);
    }
  };

  const navigation = useNavigation();

  return (
    <View>
      <View>
        {/* used TextInput to fetch api */}
        {/* <TextInput
          placeholder="Enter City Name"
          value={location}
          onKeyPress={event => setLocation(event.target.location)}
          // onChange={event => setLocation(event.target.location)}
          style={styles.inputContainer}
        />
        <Button title="Add City" onPress={getWeatherApi} /> */}

        {/* used diffrent component to add new city and store it in redux */}
        <AddCity />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({item}) => (
          <CityCard
            image={item?.id}
            title={item?.title}
            onPress={() => {
              navigation.navigate('CitiesDetailes', {
                id: item.id,
                image: item.url,
                title: item.title,
              });
            }}
          />
        )}
      />
      <Button
        title={'City Details'}
        onPress={() => navigation.navigate('CitiesDetailes')}
      />
    </View>
  );
};

export default Cities;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    marginVertical: 15,
  },
});
