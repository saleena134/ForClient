import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";

const CityCard = ({ day, night, DayIcon, NightIcon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cityContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.cityImage}>{DayIcon}</View>
          <Text style={styles.textContainer}>{day}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.cityImage}>{NightIcon}</View>
          <Text style={styles.textContainer}>{night}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cityContainer: {
    backgroundColor: "#edcd61",
    marginVertical: 15,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityImage: {
    height: 40,
    width: 40,
    borderRadius: 15,
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
