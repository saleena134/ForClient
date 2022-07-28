import {
  StyleSheet,
  Image,
  View,
  Button,
  FlatList,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CitiesDetailes from "./CitiesDetailes";
import CityCard from "./CityCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCity,
  getNewCity,
  getCurrentLocation,
  getDailyWeather,
} from "../redux/action";
import Fontisto from "react-native-vector-icons/Fontisto";
import DateAndTime from "../component/DateAndTime";
import styling from "../component/styling";
import Geolocation from "@react-native-community/geolocation";

const Cities = () => {
  const [lat, setLat] = useState({});
  const [long, setLong] = useState({});
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = React.useState("");
  const { newCityName, takeLocation, dailyWeather } = useSelector(
    (state) => state.reducer
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    getLanLat();
  }, []);

  // city details
  // const url = `https://jsonplaceholder.typicode.com/photos`;
  // const getCities = async () => {
  //   try {
  //     const response = await axios.get(url);
  //     var carryData = response.data;
  //     // setData(carryData);
  //     dispatch(getCity(carryData));
  //     console.log("checking response", response);
  //   } catch (error) {
  //     console.log("error here", error);
  //   }
  // };

  //For Position

  const [position, setPosition] = useState("");
  const [DayNight, setDayNight] = useState([]);

  const API_KEY_LOCATION = `ae9754f7eb49c310ea0a5deb0c4106ce`;

  const getLanLat = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log("checking for info", info);
      dispatch(getCurrentLocation(info));
      setPosition(info);
      setLat(info?.coords?.latitude);
      setLong(info?.coords?.longitude);
    });
    console.log("checking location here aao", takeLocation);
  };

  const getLoaction = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=imperial&appid=${API_KEY_LOCATION}`
      );
      console.log("saleena khan", response.data.daily);
      var locationData = response.data.daily;
      setDayNight(locationData);
      dispatch(getDailyWeather(locationData));
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  console.log("dekho", DayNight);

  // to see weather
  const API_KEY = `64d287ccdca74903b4362516222806`;
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  const getWeatherApi = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const WeatherResponse = await axios.get(weatherUrl);
      setWeather(WeatherResponse.data);
      console.log("weather report here", WeatherResponse);
      dispatch(getNewCity(WeatherResponse.data));
      getLoaction();
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
  const WEATHER = [
    {
      image: <Fontisto name="day-sunny" size={30} color={"black"} />,
      text: "HAZE",
    },
    {
      image: <Fontisto name="cloudy-gusts" size={30} color={"black"} />,
      text: "CLOUD",
      id: 2,
    },
    {
      image: <Fontisto name="wind" size={30} color={"black"} />,
      text: "WIND",
      id: 3,
    },
  ];

  const Night = () => <Fontisto name="night-clear" size={30} color={"black"} />;
  const NightCloudy = () => (
    <Fontisto name="night-alt-cloudy" size={30} color={"black"} />
  );
  const nightLightning = () => (
    <Fontisto name="night-alt-lightning" size={30} color={"black"} />
  );
  const Day = () => <Fontisto name="day-sunny" size={30} color={"black"} />;
  const DayCloudy = () => (
    <Fontisto name="cloudy-gusts" size={30} color={"black"} />
  );
  const Daywind = () => <Fontisto name="wind" size={30} color={"black"} />;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={
          newCityName?.current?.feelslike_c > 23
            ? require("../../assets/default.jpeg")
            : newCityName?.current?.wind_kph > 10
            ? require("../../assets/windy.jpeg")
            : require("../../assets/rain.jpeg")
        }
        style={styles.imageContainer}
      >
        <View style={styles.transContainer}>
          <View
            style={{
              flexDirection: "row",
              margin: Platform.OS == "ios" ? 10 : 5,
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
                <Fontisto
                  name="search"
                  size={Platform.OS == "ios" ? 17 : 15}
                  color={"black"}
                />
                <Text
                  style={[
                    styling.boldText,
                    {
                      color: "black",
                      fontSize: Platform.OS == "ios" ? 15 : 13,
                    },
                  ]}
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
              {loading ? (
                <ActivityIndicator
                  visible={loading}
                  color="#bc2b78"
                  size="large"
                  style={styles.activityIndicator}
                />
              ) : (
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
                        alignItems: "center",
                      }}
                    >
                      {newCityName?.current?.temp_c > 35 ? (
                        <>
                          <Fontisto
                            name="day-haze"
                            size={70}
                            color={"#edcd61"}
                          />
                          <Text style={[styling.text, { marginVertical: 5 }]}>
                            HAZE
                          </Text>
                        </>
                      ) : newCityName?.current?.temp_c <= 28 ? (
                        <>
                          <Fontisto name="rain" size={70} color={"#edcd61"} />
                          <Text style={[styling.text, { marginVertical: 5 }]}>
                            RAIN
                          </Text>
                        </>
                      ) : (
                        <>
                          <Fontisto
                            name="cloudy-gusts"
                            size={70}
                            color={"#edcd61"}
                          />
                          <Text style={[styling.text, { marginVertical: 5 }]}>
                            CLOUD
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                  <View style={{ padding: 2 }}>
                    <Text style={styles.rotText}>
                      Clouds {newCityName?.current?.cloud}
                    </Text>
                  </View>
                  <View style={styles.containerText}>
                    {details.map((value, key) => {
                      return (
                        <>
                          <View style={{ alignItems: "center" }}>
                            <Text key={key} style={styles.text}>
                              {value.text}
                            </Text>
                            <Text key={key} style={styles.text}>
                              {value.otherText}
                            </Text>
                          </View>
                        </>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      top: "30%",
                    }}
                  >
                    <Text style={[styling.boldText]}>10 Next Days</Text>
                  </View>
                  <FlatList
                    data={DayNight}
                    horizontal
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                      <CityCard
                        DayIcon={
                          item?.temp?.day >= 64
                            ? Day()
                            : item?.temp?.day <= 63
                            ? DayCloudy()
                            : Daywind()
                        }
                        NightIcon={
                          item?.temp?.night >= 57
                            ? Night()
                            : item?.temp?.night <= 55
                            ? nightLightning()
                            : NightCloudy()
                        }
                        day={item?.temp?.day}
                        night={item?.temp?.night}
                        onPress={() => {
                          navigation.navigate("CitiesDetailes");
                        }}
                      />
                    )}
                  />
                </>
              )}
            </>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
                flexGrow: 2,
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
    padding: Platform.OS == "ios" ? 10 : 6,
    width: Platform.OS == "ios" ? 220 : 210,
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "grey",
    backgroundColor: "white",
  },
  containerText: {
    top: "55%",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "bold",
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    padding: Platform.OS == "ios" ? 20 : 10,
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
    top: -10,
    right: Platform.OS == "ios" ? -170 : -160,
    transform: [{ rotate: "270deg" }],
  },
  activityIndicator: {
    height: 80,
  },
});
