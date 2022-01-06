import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    console.log("savig", value);
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

const deleteAllItems = async () => {
  try {
    // const value = await AsyncStorage.getItem("@salaries_object");
    await AsyncStorage.removeItem("@salaries_object");
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

export { storeData, getData, deleteAllItems };
