import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  Switch,
} from "react-native";
import GobalStyles from "../utils/GobalStyles";
import Collapsible from "react-native-collapsible";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButtonIcon from "./CustomTouchButton";
import { storeData } from "../utils/dataStorage";
import { useState, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButtonText from "./CustomButtonText";
import { salariesContext } from "../utils/context";
export default function AddForm({ navigation }) {
  const [valuee, setValuee] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);
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
        navigation={navigation}
        onSubmit={(values) => {
          const newSavedSalaries = {
            ...savedSalaries,
            [values.name]: { salary: values.Salary, pension: values.Pension },
          };

          navigation.navigate("Home");
          setSavedSalaries(newSavedSalaries);
          storeData(newSavedSalaries);
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required("Please provide salary name"),
          Salary: yup
            .number()
            .required("Please provide your salary")
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
                <Text style={{ marginHorizontal: 10 }}>Name</Text>

                <TextInput
                  clearButtonMode="always"
                  //   name="salary"
                  textAlign="right"
                  style={{ ...styless.numberInput, width: "40%" }}
                  placeholder="Name"
                  returnKeyType={"done"}
                  onChangeText={(value) => {
                    props.setFieldValue("name", value);
                  }}
                  value={props.values.name}
                />
              </View>
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {props.errors.name}
              </Text>
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
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {props.errors.Salary}
              </Text>
              <View style={styless.rowContainer}>
                <Text style={{ marginHorizontal: 10 }}>
                  Pension contribution
                </Text>

                <TextInput
                  clearButtonMode="always"
                  //   name="salary"
                  textAlign="right"
                  style={{ ...styless.numberInput, width: "20%" }}
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
                {props.errors.Pension}
              </Text>

              <Collapsible collapsed={isCollapsed} style={styless.rowContainer}>
                <View style={styless.rowContainer}>
                  <Text style={{ marginHorizontal: 10 }}>
                    Use Scotish Tax Region?{" "}
                  </Text>
                  <Switch
                    name="EnglishTax"
                    trackColor={{
                      false: GobalStyles.bluegray.backgroundColor,
                      true: GobalStyles.bluegray.backgroundColor,
                    }}
                    thumbColor={
                      props.values.EnglishTax
                        ? GobalStyles.yellow.backgroundColor
                        : GobalStyles.light.backgroundColor
                    }
                    ios_backgroundColor={GobalStyles.bluegray.backgroundColor}
                    onValueChange={(value) => {
                      props.setFieldValue("EnglishTax", value);
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
              {/* <CustomButton
                name="Save Salary"
                onPress={props.handleSubmit}
                color="black"
                style={{ width: "100%" }}
              /> */}
              <View style={{ width: "100%" }}>
                <CustomButtonText
                  onPress={props.handleSubmit}
                  text="Save"
                  color={GobalStyles.bluegray.backgroundColor}
                  style={{ width: "100%" }}
                />
              </View>
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
    padding: 5,
    width: "30%",
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 0.2,
    borderRadius: 15,
  },
  rowContainer: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
});
