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
export default function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <CustomButtonIcon
          size={30}
          color="black"
          name="close"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>Add Salary</Text>
      <AddForm />

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
