import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import CustomButtonGlobal from "./CustomButton";

export default function AddForm() {
  return (
    <SafeAreaView style={styless.container}>
      {/* <View style={styless.container}> */}
      <Formik
        initialValues={{ name: "", salary: Number, pension: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => {
          return (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                paddingHorizontal: 10,
              }}
            >
              <View style={styless.rowContainer}>
                <Text style={{ marginHorizontal: 10 }}>Salary</Text>
                <TextInput
                  //   name="salary"
                  style={styless.numberInput}
                  placeholder="Salary"
                  keyboardType="number-pad"
                  onChangeText={props.handleChange("salary")}
                  value={props.values.salary}
                />
              </View>
              <CustomButtonGlobal title="Save" onPress={props.handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}
const styless = StyleSheet.create({
  container: {
    margin: 10,
    // backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
  },
  numberInput: {
    padding: 10,
    width: "30%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
