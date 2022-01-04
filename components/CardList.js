import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Chip } from "react-native-paper";
export default function CardList({ navigation }) {
  generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
  const DATA = [
    {
      id: "1",
      name: "Mine",
      salary: "80000",
    },
    {
      id: "2",
      name: "yours",
      salary: "20000",
    },
  ];

  const randomColorGenerator = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={DATA}
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
                    backgroundColor: randomColorGenerator(),
                  }}
                >
                  <Text style={{ color: "white" }}>sdsd</Text>
                </Chip>
              </View>
              <Text>{item.name}</Text>
              <Text>{item.salary}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
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
    // flex: 1,
    width: "100%",
    flexDirection: "column",
    // alignItems: "center",
  },
  card: {
    // flex: 1,
    // height: 100,
    backgroundColor: "#a1e7ff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
