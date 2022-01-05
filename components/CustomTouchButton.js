import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

const CustomButtonIcon = ({ onPress, name, color, size }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default CustomButtonIcon;
