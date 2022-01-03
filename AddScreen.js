import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import AddForm from "./components/AddForm";
import CustomButton from "./components/CustomTouchButton";
export default function AddScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <CustomButton
          size="30"
          color="black"
          name="close"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>Add Salary</Text>
      <AddForm />
      <Text>Add Salary</Text>

      {/* <Button title="Go/Back" onPress={() => navigation.goBack()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
