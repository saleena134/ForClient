import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLocation } from "../redux/action";

const Locations = () => {
  const dispatch = useDispatch();
  const { takeLocation } = useSelector((state) => state.reducer);

  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [location, setlocation] = useState("");

  const API_KEY = `ae9754f7eb49c310ea0a5deb0c4106ce`;

  useEffect(() => {
    getLanLat();
    getLoaction();
    console.log("come here and see", takeLocation);
  }, []);

  const getLanLat = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log(info);
      setlocation(info);
      let positionInfo = location;
      dispatch(getCurrentLocation(positionInfo));
    });
    console.log("checking location ", location?.coords?.longitude);
  };
  const getLoaction = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      );
      console.log("saleena khan", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Locations</Text>
    </View>
  );
};

export default Locations;

const styles = StyleSheet.create({});
