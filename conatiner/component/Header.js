import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
    // marginTop: 10,
    width: Platform.OS == "ios" ? 380 : 360,
    backgroundColor: "#edcd61",
    borderBottomStartRadius: Platform.OS == "ios" ? 70 : 90,
    borderBottomEndRadius: Platform.OS == "ios" ? 70 : 90,
    padding: Platform.OS == "ios" ? 20 : 15,
    flexDirection: "row",
  },
});
export default Header;
