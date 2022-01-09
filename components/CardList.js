import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import CustomButtonIcon from "./CustomTouchButton";
import { useContext, useRef } from "react";
import { salariesContext } from "../utils/context";
import { PanGestureHandler } from "react-native-gesture-handler";
import { salaryPerSetting } from "../utils/salaryPerSetting";
import { CountUp } from "use-count-up";
export default function CardList({ navigation, pressedButton }) {
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  //   generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");

  //   const randomColorGenerator = () => {
  //     var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //     return "#" + randomColor;
  //   };
  const ListItem = ({ obj }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailsScreen", {
            salary: savedSalaries[obj].salary,
            pension: savedSalaries[obj].pension,
            key: obj,
          });
        }}
      >
        <View style={[styles.card, styles.boxShadow]}>
          <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
            <Chip
              style={{
                // backgroundColor: randomColorGenerator(),
                backgroundColor: "black",
                padding: 0,
              }}
            >
              <Text style={{ color: "white" }}>{obj}</Text>
            </Chip>
          </View>
          <Text>
            £{" "}
            <CountUp
              isCounting
              end={salaryPerSetting(savedSalaries[obj].salary, pressedButton)}
              key={salaryPerSetting(savedSalaries[obj].salary, pressedButton)}
              duration={0.2}
              decimalPlaces={2}
            />
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <ScrollView style={{ flex: 1 }}>
        {savedSalaries &&
          Object.keys(savedSalaries).map((obj) => {
            return <ListItem obj={obj} key={obj} pre />;
          })}
      </ScrollView>
    </View>
  );
}

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === "ios") {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalStyles.mainBackgroundColor.backgroundColor,
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#b2aa99",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
