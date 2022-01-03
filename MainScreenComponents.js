import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="ios-add-circle" color="#3184ff" size={50} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  numberInput: {
    padding: 5,
    width: "100%",
    borderColor: "grey",
    borderWidth: 0.3,
    borderRadius: 15,
  },
});

export default AddButton;
