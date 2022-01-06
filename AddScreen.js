import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";

import AddForm from "./components/AddForm";
import CustomButtonIcon from "./components/CustomTouchButton";
export default function AddScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <CustomButtonIcon
          size={40}
          color="black"
          name="arrow-back"
          size={40}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>Add Salary</Text>
      <AddForm navigation={navigation} />

      {/* <Button title="Go/Back" onPress={() => navigation.goBack()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    transform: [{ translateY: 50 }],
    borderRadius: 32,
    margin: 10,
    flex: 1,
    // backgroundColor: "#f7d13f",
    backgroundColor: "#F7753F",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
