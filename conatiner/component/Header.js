import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styling from "./styling";

const Header = ({ children, title, navigation, backScreen, ...props }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" color={"white"} size={30} />
    </TouchableOpacity>
    <Text style={styling.text}>{title}</Text>
    {children}
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    width: 380,
    backgroundColor: "#edcd61",
    borderBottomStartRadius: 70,
    borderBottomEndRadius: 70,
    padding: 20,
    flexDirection: "row",
  },
});
export default Header;
