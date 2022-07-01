import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import styling from "./styling";

export default function DateAndTime() {
  const [dateTime, setDateTime] = useState(null);
  const [dayTime, setDayTime] = useState(null);
  const [daysOnly, setDaysOnly] = useState(null);
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const Days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  const getCurrentDate = () => {
    var month = new Date().getMonth();
    var date = new Date().getDate();

    return date + " " + MONTHS[month];
  };

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    var min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();

    return "," + hours + ":" + min;
  };
  const getCurrentDay = () => {
    let today = new Date();
    var day = today.getDay();

    return Days[day];
  };

  useEffect(() => {
    let dayonly = getCurrentTime();
    setDayTime(dayonly);
    let dateonly = getCurrentDate();
    setDateTime(dateonly);
    let daysonly = getCurrentDay();
    setDaysOnly(daysonly);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styling.boldText}>
        {dateTime} {dayTime}
      </Text>
      <Text style={styling.boldText}>{daysOnly}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginRight: 50,
  },
});
