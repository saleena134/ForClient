import React from "react";

import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Cities from "./conatiner/ForClient/Cities";
import CitiesDetailes from "./conatiner/ForClient/CitiesDetailes";
import CityCard from "./conatiner/ForClient/CityCard";
import { Provider } from "react-redux";
import { store } from "./conatiner/redux/store";
import Abc from "./conatiner/ForClient/Abc";
import Locations from "./conatiner/component/Locations";

const Stack = createStackNavigator();
// here
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // useNativeDriver: true,
        headerShown: false,
      }}
      // initialRouteName="checking"
    >
      <Stack.Screen name="Cities" component={Cities} />
      <Stack.Screen name="CitiesDetailes" component={CitiesDetailes} />
      <Stack.Screen name="CityCard" component={CityCard} />
      {/* <Stack.Screen name="Locations" component={Locations} /> */}
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
