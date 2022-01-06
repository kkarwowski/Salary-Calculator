import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import CustomButtonIcon from "./components/CustomTouchButton";
import { storeData } from "./utils/dataStorage";
import calculateFunction from "./utils/calculateFunction";
import { salariesContext } from "./utils/context";
import { useContext } from "react";
export default function DetailsScreen({ route, navigation }) {
  const salary = route.params.salary;
  const pensionPercentage = route.params.pension;
  const key = route.params.key;
  console.log(salary);
  const { totalTax, NIYear, pensionContibution, Takehome } = calculateFunction(
    salary,
    pensionPercentage
  );

  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  const deleteThisSalary = (salaryKey) => {
    navigation.goBack();
    const newSalaries = Object.assign({}, savedSalaries);
    delete newSalaries[salaryKey];
    setSavedSalaries(newSalaries);
    storeData(newSalaries);
  };
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
      <Text>sALARY DETAILS{key}</Text>
      <Text>salary = {salary}</Text>
      <Text>
        total tax = {totalTax}, NI = {NIYear}, pension={pensionContibution},
        take home = {Takehome}
      </Text>
      <CustomButtonIcon
        size={40}
        color="red"
        name="delete"
        onPress={() => deleteThisSalary(key)}
      />
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
