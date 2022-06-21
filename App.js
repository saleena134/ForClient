import React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Cities from './conatiner/ForClient/Cities';
import CitiesDetailes from './conatiner/ForClient/CitiesDetailes';
import CityCard from './conatiner/ForClient/CityCard';
import {Provider} from 'react-redux';
import {store} from './conatiner/redux/store';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        useNativeDriver: true,
      }}
      initialRouteName="Cities">
      <Stack.Screen name="Cities" component={Cities} />
      <Stack.Screen name="CitiesDetailes" component={CitiesDetailes} />
      <Stack.Screen name="CityCard" component={CityCard} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
