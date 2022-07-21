import { Platform } from "react-native";

export default {
  text: {
    color: "white",
    fontSize: 18,
  },
  boldText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  headingText: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },
  spaceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    alignContent: "baseline",
  },
  button: {
    backgroundColor: "#edcd61",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "grey",
    alignItems: "center",
    padding: 10,
    width: Platform.OS == "ios" ? 100 : 80,
    alignSelf: "center",
  },
};
