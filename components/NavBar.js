import { Pressable, Text, StyleSheet, View, Button } from "react-native";
import { useContext } from "react";
import { navChosenDevider } from "../utils/context";
import ButtonNav from "./ButtonNav";
export default function () {
  const { pressedButton, setPressedButton } = useContext(navChosenDevider);
  return (
    <View style={styles.topNavContainer}>
      <ButtonNav
        onPress={() => {
          setPressedButton("Annual");
        }}
        title="Annual"
      ></ButtonNav>
      <ButtonNav
        onPress={() => {
          setPressedButton("Monthly");
        }}
        title="Monthly"
      ></ButtonNav>
      <ButtonNav
        onPress={() => {
          setPressedButton("Weekly");
        }}
        title="Weekly"
      ></ButtonNav>
      <ButtonNav
        onPress={() => {
          setPressedButton("Daily");
        }}
        title="Daily"
      ></ButtonNav>
      <ButtonNav
        onPress={() => {
          setPressedButton("Hourly");
        }}
        title="Hourly"
      ></ButtonNav>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // backgroundColor: "#2690ff",
    backgroundColor: "#f2fedc",

    borderRadius: 10,
    width: "100%",
  },
});
