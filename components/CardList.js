import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import CustomButtonIcon from "./CustomTouchButton";
import { useContext, useRef } from "react";
import { salariesContext } from "../utils/context";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
export default function CardList({ navigation }) {
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  //   generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");

  //   const randomColorGenerator = () => {
  //     var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //     return "#" + randomColor;
  //   };

  const ListItem = ({ obj }) => {
    // const translateX = useSharedValue(0);
    // const panGesture = useAnimatedGestureHandler({
    //   onActive: (event) => {
    //     translateX.value = event.translationX;
    //   },
    //   onEnd: () => {},
    // });
    // const rStyle = useAnimatedStyle(() => ({
    //   transform: [
    //     {
    //       translateX: translateX.value,
    //     },
    //   ],
    // }));
    // console.log("ff", reff.PanGestureHandlerProps.simultaneousHandlers);
    return (
      // <PanGestureHandler
      //   simultaneousHandlers={reff.simultaneousHandlers}
      //   onGestureEvent={panGesture}
      // >
      //   <Animated.View style={[rStyle]}>
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
          {/* <Text>{item.name}</Text> */}
          <Text>{savedSalaries[obj].pension}</Text>
          <Text>{savedSalaries[obj].salary}</Text>
        </View>
      </TouchableOpacity>
      //   </Animated.View>
      // </PanGestureHandler>
    );
  };
  const scrollReff = useRef(null);
  return (
    <View style={styles.cardContainer}>
      <ScrollView style={{ flex: 1 }} ref={scrollReff}>
        {savedSalaries &&
          Object.keys(savedSalaries).map((obj) => {
            return <ListItem obj={obj} reff={scrollReff} key={obj} />;
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
