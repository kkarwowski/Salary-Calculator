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
import * as yup from "yup";
import CustomButtonIcon from "./CustomTouchButton";

import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButtonText from "./CustomButtonText";
export default function AddForm() {
  const [valuee, setValuee] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openCountry, setOpenCountry] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <SafeAreaView style={styless.container}>
      {/* <View style={styless.container}> */}
      <Formik
        initialValues={{
          name: "",
          Salary: "30000",
          Pension: 4,
          EnglishTax: false,
        }}
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
          //   EnglishTax: yup.boolean,
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
                  clearButtonMode="always"
                  //   name="salary"
                  textAlign="right"
                  style={styless.numberInput}
                  placeholder="Salary"
                  keyboardType="number-pad"
                  returnKeyType={"done"}
                  onChangeText={(value) => {
                    props.setFieldValue("Salary", value);
                  }}
                  value={props.values.Salary.toString()}
                />
              </View>

              <View style={styless.rowContainer}>
                <Text style={{ marginHorizontal: 10 }}>
                  Pension contribution
                </Text>

                <TextInput
                  clearButtonMode="always"
                  //   name="salary"
                  textAlign="right"
                  style={{ ...styless.numberInput, width: "15%" }}
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
                  <CustomButtonIcon
                    name="add-circle-outline"
                    color="black"
                    size={40}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={isCollapsed} style={styless.rowContainer}>
                <View style={styless.rowContainer}>
                  <Text style={{ marginHorizontal: 10 }}>
                    Use Scotish Tax Region?{" "}
                  </Text>
                  <Switch
                    name="EnglishTax"
                    trackColor={{ false: "#767577", true: "red" }}
                    thumbColor={props.values.EnglishTax ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="white"
                    onValueChange={(value) => {
                      props.setFieldValue("EnglishTax", value);
                      console.log(value);
                    }}
                    value={props.values.EnglishTax}
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
              {/* <CustomButton
                name="Save Salary"
                onPress={props.handleSubmit}
                color="black"
                style={{ width: "100%" }}
              /> */}
              <CustomButtonText
                onPress={props.handleSubmit}
                text="Save"
                color="black"
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
    padding: 10,
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
