import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";

export default function AddScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Salary</Text>

      <TextInput
        keyboardType="number-pad"
        style={styles.numberInput}
        placeholder="Enter Salary"
      />
      <Button title="Go/Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  numberInput: {
    padding: 5,
    width: "100%",
    borderColor: "grey",
    borderWidth: 0.3,
    borderRadius: 15,
  },
});
