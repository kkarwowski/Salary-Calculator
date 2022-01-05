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
import calculateFunction from "./utils/calculateFunction";
export default function DetailsScreen({ route, navigation }) {
  const salary = route.params.salary;
  const pensionPercentage = route.params.pension;
  console.log(salary);
  // const { totalTax, NIYear, pensionContibution, Takehome } = calculateFunction(
  //   salary,
  //   pensionPercentage
  // );
  calculateFunction(salary, pensionPercentage);
  // console.log(Takehome, "Take Home");
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
