import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "./utils/GobalStyles";
import { SafeAreaView , SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import { CountUp } from "use-count-up";
import { salaryPerSetting } from "./utils/salaryPerSetting";
import { Chip } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { salariesContext, navChosenDevider } from "./utils/context";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsScreen from "./DetailsScreen";
import AddScreen from "./AddScreen";
import CustomButtonIcon from "./components/CustomTouchButton";
// import CardList from "./components/CardList";
import { getData, storeData, deleteAllItems } from "./utils/dataStorage";
import { TransitionSpecs } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import CustomButtonText from "./components/CustomButtonText";
import { createContext } from "react";
import calculateFunction from "./utils/calculateFunction";
export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [savedSalaries, setSavedSalaries] = useState();
  const [pressedButton1, setPressedButton1] = useState("Annual");
  useEffect(() => {
    getAndSetSalaries();
  }, []);
  const testObject = {
    test: {
      salary: "23434",
      pension: 5,
    },
    test1: {
      salary: "2457622222",
      pension: 56,
    },
  };

  const getAndSetSalaries = async () => {
    const data = await getData();
    if (data) {
      setSavedSalaries(JSON.parse(data));
      console.log(data, "yess");
    } else {
      // setSavedSalaries(null);
      confirm.log(data);
    }
  };
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // background: "yellow",
      background: GlobalStyles.mainBackgroundColor.backgroundColor,
      // margin: 10,
    },
  };
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  function ButtonNav({ title, onPress }) {
    return (
      <Pressable
        style={{
          ...styles.buttonNav,
          backgroundColor:
            title === pressedButton1
              ? GlobalStyles.navActive.backgroundColor
              : GlobalStyles.navBackground.backgroundColor,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...styles.ButtonText,
            color: title === pressedButton1 ? "black" : "white",
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  }
  function NavBar(props) {
    const { onPress, title } = props;

    return (
      <View style={styles.topNavContainer}>
        <ButtonNav
          onPress={() => {
            setPressedButton1("Annual");
          }}
          title="Annual"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton1("Monthly");
          }}
          title="Monthly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton1("Weekly");
          }}
          title="Weekly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton1("Daily");
          }}
          title="Daily"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton1("Hourly");
          }}
          title="Hourly"
        ></ButtonNav>
      </View>
    );
  }
  function HomeScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          // options={{
          //   headerShown: false,
          //   gestureEnabled: false,
          //   cardStyleInterpolator: forFade,
          // }}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
  function SecondScreen() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Second Screen</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <CustomButtonText text="test" onPress={() => storeData(testObject)} />
        <CustomButtonText
          text="test read"
          onPress={() => {
            getAndSetSalaries();
          }}
        />
        <CustomButtonText
          text="read obj"
          onPress={() =>
            // Object.keys(savedSalaries).map((key) => {
            //   console.log(savedSalaries[key].salary);
            // })
            console.log("ALL SALARIES", savedSalaries)
          }
        />
        <CustomButtonText text="Detele ALL" onPress={() => deleteAllItems()} />
      </View>
    );
  }

  const AddTaskButton = ({ navigation }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <CustomButtonIcon
          name="add-circle"
          size={50}
          color={GlobalStyles.yellow.backgroundColor}
          onPress={() =>
            navigation.navigate("AddScreen", savedSalaries, setSavedSalaries)
          }
        />
      </View>
    );
  };

  const ListItem = ({ obj, navigation }) => {
    const { Takehome } = calculateFunction(
      savedSalaries[obj].salary,
      savedSalaries[obj].pension
    );
    console.log("take home", savedSalaries[obj].pension);
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
          <View
            style={{
              // justifyContent: "flex-end",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor:
                  GlobalStyles.mainBackgroundColor.backgroundColor,
                borderRadius: 20,
                padding: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 11 }}>{obj}</Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItem: "center",
                width: "100%",
              }}
            >
              <Text>Gross</Text>
              <Text>
                £{" "}
                <CountUp
                  isCounting
                  end={salaryPerSetting(
                    savedSalaries[obj].salary,
                    pressedButton1
                  )}
                  key={salaryPerSetting(
                    savedSalaries[obj].salary,
                    pressedButton1
                  )}
                  duration={0.2}
                  decimalPlaces={2}
                />
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItem: "center",
                width: "100%",
                paddingVertical: 5,
              }}
            >
              <Text>Take Home</Text>
              <Text>
                £{" "}
                <CountUp
                  isCounting
                  end={salaryPerSetting(Number(Takehome), pressedButton1)}
                  key={salaryPerSetting(
                    savedSalaries[obj].salary,
                    pressedButton1
                  )}
                  duration={0.2}
                  decimalPlaces={2}
                />
              </Text>
            </View>
          </View>
          {/* <Text>{savedSalaries[obj].pension}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  const Home = ({ navigation }) => {
    const insets=useSafeAreaInsets()
    return (
      <View style={{...styles.container,paddingTop:insets.top, marginLeft:insets.left+10, marginRight:insets.right+10, paddingBottom:0, paddingLeft:insets.left, paddingRight: insets.right}}>
        <Text
          style={{
            fontSize: 20,
            padding: 20,
            paddingTop: 30,
            fontWeight: "600",
            color: GlobalStyles.light.backgroundColor,
          }}
        >
          Saved Salaries
        </Text>

        <NavBar />
        <AddTaskButton navigation={navigation} />

        <View style={styles.cardContainer}>
          <ScrollView style={{ flex: 1 }}>
            {savedSalaries &&
              Object.keys(savedSalaries).map((obj) => {
                return <ListItem obj={obj} key={obj} navigation={navigation} />;
              })}
          </ScrollView>
        </View>

        {/* <CardList navigation={navigation} pressedButton={pressedButton} /> */}
        {/* </SafeAreaView> */}
      </View>

    );
  };

  return (
    <SafeAreaProvider>
    <salariesContext.Provider value={{ savedSalaries, setSavedSalaries }}>
      {/* <navChosenDevider.Provider value={{ pressedButton, setPressedButton }}> */}
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
 
          screenOptions={{
            borderTopWidth: 0,
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Salaries"
            component={HomeScreen}
            options={{
              tabBarStyle: {
                color: GlobalStyles.mainBackgroundColor.backgroundColor,
                backgroundColor:
                  GlobalStyles.mainBackgroundColor.backgroundColor,
              },

              tabBarLabelStyle: {
                fontSize: 13,
                color: GlobalStyles.light.backgroundColor,
                fontWeight: "500",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-circle"
                  color={GlobalStyles.yellow.backgroundColor}
                  size={30}
                />
              ),
              // tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="SecondScreen"
            component={SecondScreen}
            options={{
              tabBarStyle: {
                backgroundColor:
                  GlobalStyles.mainBackgroundColor.backgroundColor,
              },
              tabBarLabelStyle: {
                fontSize: 13,
                color: GlobalStyles.light.backgroundColor,
                fontWeight: "500",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="tooltip-edit"
                  color={GlobalStyles.yellow.backgroundColor}
                  size={30}
                />
              ),
              // tabBarBadge: 3, tooltip-edit
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      {/* </navChosenDevider.Provider> */}
    </salariesContext.Provider>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f7d13f",
    backgroundColor: GlobalStyles.mainBackgroundColor.backgroundColor,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    // marginTop: insets.Top+10,
    // paddingTop: insets.top+20,
  },
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: GlobalStyles.navBackground.backgroundColor,
    borderRadius: 10,
    width: "100%",
  },
  buttonNav: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    // backgroundColor: GlobalStyles.bluegray.backgroundColor,
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "black",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalStyles.mainBackgroundColor.backgroundColor,
    // marginVertical: 5,
  },
  card: {
    backgroundColor: GlobalStyles.light.backgroundColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    // marginHorizontal: 10,
  },
  containerBottomTabs: {
    //backgroundColor: Colors.darkBackgroundColor
    borderTopWidth: 0
}
});
