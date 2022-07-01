import {
  StyleSheet,
  Image,
  View,
  Button,
  FlatList,
  TextInput,
  ImageBackground,
  Text,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CitiesDetailes from "./CitiesDetailes";
import CityCard from "./CityCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getNewCity, getCurrentLocation } from "../redux/action";
import Fontisto from "react-native-vector-icons/Fontisto";
import DateAndTime from "../component/DateAndTime";
import styling from "../component/styling";
import { TouchableOpacity } from "react-native-gesture-handler";
import Geolocation from "@react-native-community/geolocation";
import Header from "../component/Header";

const Cities = () => {
  const [data, setData] = React.useState([]);
  const [weather, setWeather] = React.useState({});
  const [location, setLocation] = React.useState("");
  const { newCityName, takeLocation } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getCities();
    getWeatherApi();
    getLanLat();
    getLoaction();
    // console.log("come here and see", takeLocation);
  }, []);

  // city details
  const url = `https://jsonplaceholder.typicode.com/photos`;
  const getCities = async () => {
    try {
      const response = await axios.get(url);
      var carryData = response.data;
      setData(carryData);
      dispatch(getCity(carryData));
      console.log("checking response", response);
    } catch (error) {
      console.log("error here", error);
    }
  };

  //For Position

  const [position, setPosition] = useState("");
  const [DayNight, setDayNight] = useState([]);

  const API_KEY_LOCATION = `ae9754f7eb49c310ea0a5deb0c4106ce`;

  const getLanLat = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log(info);
      setPosition(info);
      // let positionInfo = position;
      dispatch(getCurrentLocation(position));
    });
    console.log("checking location here aao", position);
  };
  const getLoaction = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY_LOCATION}`
      );
      console.log("saleena khan", response.data);
      var locationData = response.data.daily;
      setDayNight(locationData);
    } catch (error) {
      console.log(error);
    }
  };

  // to see weather
  const API_KEY = `64d287ccdca74903b4362516222806`;
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  const getWeatherApi = async () => {
    try {
      const WeatherResponse = await axios.get(weatherUrl);
      setWeather(WeatherResponse.data);
      console.log("weather report here", WeatherResponse);
      dispatch(getNewCity(WeatherResponse.data));
      setLocation("");
    } catch (error) {
      console.log("error here", error);
    }
  };

  const navigation = useNavigation();

  const details = [
    {
      text: newCityName !== "" ? newCityName?.current?.feelslike_c : null,
      id: 1,
      otherText: "Feels like",
    },
    {
      text: newCityName !== "" ? newCityName?.current?.humidity : null,
      id: 2,
      otherText: "Humidity",
    },
    {
      text: newCityName !== "" ? newCityName?.current?.wind_kph : null,
      id: 3,
      otherText: "Wind Speed",
    },
  ];

  const Day = () => <Fontisto name="day-sunny" size={30} color={"black"} />;
  const Night = () => <Fontisto name="night-clear" size={30} color={"black"} />;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={
          newCityName?.current?.feelslike_c > 23
            ? require("../../assets/1.jpeg")
            : require("../../assets/rain.jpeg")
        }
        style={styles.imageContainer}
      >
        <View style={styles.transContainer}>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <TextInput
              placeholder="Enter Your City"
              placeholderTextColor={"black"}
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.inputContainer}
            />
            <TouchableOpacity onPress={getWeatherApi} style={styling.button}>
              <View style={{ flexDirection: "row" }}>
                <Fontisto name="search" size={17} color={"black"} />
                <Text
                  style={[styling.boldText, { color: "black", fontSize: 15 }]}
                >
                  Get City
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#edcd61",
              width: "auto",
              marginBottom: 15,
            }}
          />

          {newCityName?.location?.name != null ? (
            <>
              <View style={styling.spaceContainer}>
                <DateAndTime />
                <Text
                  style={[
                    styling.headingText,
                    {
                      flexShrink: 1,
                    },
                  ]}
                >
                  {newCityName?.location?.name}
                </Text>
              </View>
              <View style={styling.spaceContainer}>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styling.headingText, { fontSize: 60 }]}>
                    {newCityName?.current?.temp_c} F
                  </Text>

                  <Text style={[styling.text, { marginVertical: 5 }]}>
                    Feels like {newCityName?.current?.feelslike_c}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Fontisto name="day-haze" size={70} color={"white"} />
                  <Text style={[styling.text, { marginVertical: 5 }]}>
                    HAZE
                  </Text>
                </View>
              </View>
              <Text style={styles.rotText}>
                Clouds {newCityName?.current?.cloud}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <Text style={[styling.boldText, { marginBottom: 5 }]}>
                  check condition
                </Text>
                <Text style={[styling.text, { fontSize: 15 }]}>
                  {newCityName?.current?.condition?.text}
                </Text>
              </View>
              <View style={styles.containerText}>
                {details.map((value) => {
                  return (
                    <>
                      <View style={{ alignItems: "center" }}>
                        <Text key={value.id} style={styles.text}>
                          {value.text}
                        </Text>
                        <Text key={value.id} style={styles.text}>
                          {value.otherText}
                        </Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  tintColor: "#edcd61",
                  marginVertical: 20,
                }}
                source={require("../../assets/location.png")}
              />
              <Text
                style={[
                  styling.text,
                  { alignSelf: "center", justifyContent: "center" },
                ]}
              >
                Select your location to see deatils
              </Text>
            </View>
          )}

          <FlatList
            data={DayNight}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CityCard
                DayIcon={Day()}
                NightIcon={Night()}
                day={item?.temp?.day}
                night={item?.temp?.night}
                onPress={() => {
                  navigation.navigate("CitiesDetailes");
                }}
              />
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Cities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edcd61",
  },
  imageContainer: {
    flex: 1,
    resizeMode: "cover",
  },
  inputContainer: {
    padding: 10,
    width: 220,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "grey",
    backgroundColor: "white",
  },
  containerText: {
    top: "50%",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "bold",
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  transContainer: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.7,
    padding: 10,
  },
  rotText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    right: -170,
    // top: -40,
    transform: [{ rotate: "270deg" }],
  },
});
