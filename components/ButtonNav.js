import { Pressable, Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { navChosenDevider } from "../utils/context";
export default function ButtonNav(props) {
  const { onPress, title } = props;
  const { pressedButton, setPressedButton } = useContext(navChosenDevider);
  return (
    <Pressable
      style={{
        ...styles.buttonNav,
        // backgroundColor: title === pressedButton ? "#205a6d" : "#3596b5",
        // backgroundColor: title === pressedButton ? "#002982" : "#2690ff",
        backgroundColor: title === pressedButton ? "#006e5d" : "#f2fedc",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.ButtonText,
          color: title === pressedButton ? "white" : "black",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonNav: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#f2fedc",
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "black",
  },
});
