import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Abc = () => {
  useEffect(() => {
    apiCheck();
  }, []);

  const apiCheck = async () => {
    try {
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=64d287ccdca74903b4362516222806&q=Delhi`
      );
      console.log("checking api ", resp);
    } catch (error) {
      console.log("error found", error);
    }
  };
  return (
    <View>
      <Text>Abc</Text>
    </View>
  );
};

export default Abc;

const styles = StyleSheet.create({});
