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
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <CustomButtonIcon
          size={40}
          color="black"
          name="close"
          size={40}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>sALARY DETAILS</Text>

      {/* <Button title="Go/Back" onPress={() => navigation.goBack()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    transform: [{ translateY: -50 }],
    transform: [{ translateY: 50 }],
    borderRadius: 32,
    borderRadius: 32,
    height: "90%",
    // flex: 1,
    backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
