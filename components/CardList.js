import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { Chip } from "react-native-paper";
import CustomButtonIcon from "./CustomTouchButton";
import { useContext } from "react";
import { salariesContext } from "../utils/context";
export default function CardList({ navigation }) {
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  //   generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");

  //   const randomColorGenerator = () => {
  //     var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //     return "#" + randomColor;
  //   };

  const AddTaskButton = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <CustomButtonIcon
          name="add-circle"
          size={50}
          color={"#2f4858"}
          onPress={() =>
            navigation.navigate("AddScreen", savedSalaries, setSavedSalaries)
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <FlatList
        contentContainerStyle={{
          justifyContent: "flex-start",
          flex: 1,
          backgroundColor: "#f7d13f",
        }}
        //   contentContainerStyle={styles.cardContainer}
        // data={DATA}
        data={savedSalaries && Object.keys(savedSalaries)}
        ListFooterComponent={<AddTaskButton />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailsScreen");
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
                  <Text style={{ color: "white" }}>{item}</Text>
                </Chip>
              </View>
              {/* <Text>{item.name}</Text> */}
              <Text>{savedSalaries[item].pension}</Text>
              <Text>{savedSalaries[item].salary}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
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
    backgroundColor: "#f7d13f",
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
