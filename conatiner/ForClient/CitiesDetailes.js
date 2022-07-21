import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../component/Header";
import styling from "../component/styling";

const CitiesDetailes = ({ route, navigation }) => {
  const listing = route.params;
  // const { DayIcon, NightIcon, id, day } = listing;
  const cityDetails = useSelector((state) => state.reducer);
  const { newCityName, takeLocation, dailyWeather } = useSelector(
    (state) => state.reducer
  );
  React.useEffect(() => {
    console.log("Entered New city name=====>", newCityName);
    console.log("City details=====>", cityDetails);
    console.log("Location=====>", takeLocation);
    console.log("daily weather =====>", dailyWeather);
  }, []);
  const Details = [
    { title: "Accuracy", text: takeLocation?.coords?.accuracy },
    { title: "Altitude", text: takeLocation?.coords?.altitude },
    { title: "Heading", text: takeLocation?.coords?.heading },
    { title: "Speed", text: takeLocation?.coords?.speed },
    { title: "Timestamp", text: takeLocation?.timestamp },
  ];
  return (
    <SafeAreaView style={styles.SafeAreacontainer}>
      <View style={styles.container}>
        <Header title={"Cities Details"} navigation={navigation} />
        <View style={styles.cityContainer}>
          <View style={styles.cityImage}>
            <Text
              style={[styling.headingText, { color: "black", fontSize: 20 }]}
            >
              Details
            </Text>
            {Details.map((value) => {
              return (
                <>
                  <Text
                    style={[
                      styles.textContainer,
                      { color: "black", fontSize: 18 },
                    ]}
                  >
                    <Text
                      style={[styles.text, { color: "gray", fontSize: 18 }]}
                    >
                      {value.title}
                    </Text>{" "}
                    {value.text}
                  </Text>
                </>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CitiesDetailes;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // height: Platform.OS == "ios" ? 450 : 400,
  },
  SafeAreacontainer: {
    flex: 1,
  },
  cityContainer: {
    backgroundColor: "#ebf5f4",
    padding: 10,
    marginVertical: 10,
  },
  CitiesDetailes: { flexDirection: "column" },
  cityImage: {
    height: 300,
    width: 300,
  },
  textContainer: {
    marginTop: 10,
    fontWeight: "bold",
    color: "gray",
  },
});
