import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

export default function AddScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Screen</Text>
      <Button title="Go/Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
