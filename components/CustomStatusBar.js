import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";
const CustomStatusBar = ({ backgroundColor, barStyle = "dark-content" }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor }}>
      {/*  height: insets.top */}
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default CustomStatusBar;
