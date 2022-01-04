import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  Switch,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Formik } from "formik";
import CustomButtonGlobal from "./CustomButton";
import * as yup from "yup";
import CustomButton from "./CustomTouchButton";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
export default function AddForm() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [value, setValue] = useState(null);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <SafeAreaView style={styless.container}>
      {/* <View style={styless.container}> */}
      <Formik
        initialValues={{ name: "", Salary: "30000", Pension: 4 }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          Salary: yup
            .number()
            .required("Please, provide your salary!")
            .typeError("Salary must be a number and can't be empty")
            .positive(),
          Pension: yup
            .number()
            .max(100)
            .min(0)
            .required()
            .typeError("Pension must be a number and can't be empty"),
        })}
      >
        {(props) => {
          return (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styless.rowContainer}>
                <Text style={{ marginHorizontal: 10 }}>Salary</Text>
                <TextInput
                  //   clearButtonMode
                  //   name="salary"
                  textAlign="right"
                  style={styless.numberInput}
                  placeholder="Salary"
                  keyboardType="number-pad"
                  returnKeyType={"done"}
                  onChangeText={(value) => {
                    props.setFieldValue("Salary", value);
                  }}
                  onCh
                  value={props.values.Salary.toString()}
                />
              </View>
              <View style={styless.rowContainer}>
                <Text style={{ marginHorizontal: 10 }}>
                  Pension contribution
                </Text>

                <TextInput
                  clearButtonMode
                  //   name="salary"
                  textAlign="right"
                  style={styless.numberInput}
                  placeholder="Pension"
                  keyboardType="number-pad"
                  returnKeyType={"done"}
                  onChangeText={(value) => {
                    props.setFieldValue("Pension", Number(value));
                  }}
                  value={props.values.Pension.toString()}
                />
              </View>
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {props.errors.Salary}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setIsCollapsed(!isCollapsed);
                }}
              >
                <View
                  style={{
                    // justifyContent: "space-around",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text>Advanced Options</Text>
                  <CustomButton
                    name="add-circle-outline"
                    color="black"
                    size={30}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={isCollapsed} style={styless.rowContainer}>
                <View style={styless.rowContainer}>
                  <Text style={{ marginHorizontal: 10 }}>
                    Use Scotish Tax Region?{" "}
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "red" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  {/* <DropDownPicker
                    labelStyle={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                    open={openCountry}
                    value={value}
                    items={items}
                    setOpen={setOpenCountry}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(value) => console.log(value)}
                  /> */}
                </View>
              </Collapsible>
              <CustomButtonGlobal
                title="Save Salary"
                onPress={props.handleSubmit}
                style={{ width: "100%" }}
              />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}
const styless = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    // backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
  },
  numberInput: {
    padding: 7,
    width: "30%",
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
  },
  rowContainer: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
