import {
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
const CustomButtonText = ({
  color = "#2f4858",
  onPress,
  text,
  textColor = "white",
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={{ ...styles.ButtonText, color: textColor }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 10,

    // marginHorizontal: 2,
  },
});
export default CustomButtonText;
