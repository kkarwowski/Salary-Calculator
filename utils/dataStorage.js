import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@salaries_object", jsonValue);
  } catch (e) {
    // saving error
  }
};
const getData = async () => {
  try {
    // const value = await AsyncStorage.getItem("@salaries_object");
    const jsonValue = await AsyncStorage.getItem("@salaries_object");
    console.log(jsonValue, "value");
    // setTobj(JSON.parse(jsonValue));
    // return value != null ? Number(value) : null;
    // setSalary(Number(value));
    return jsonValue;
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

export { storeData, getData };