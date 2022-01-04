import { Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
const CustomButtonGlobal = (props) => {
  const { onPress, title } = props;
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={{
        ...styles.button,
        // backgroundColor: pressed ? "white" : "black",
      }}
      onPress={() => {
        // setPressed(true);
        onPress();
        // setPressed(false);
      }}
    >
      <Text style={styles.ButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#2690ff",
    // marginHorizontal: 2,
  },
});
export default CustomButtonGlobal;
