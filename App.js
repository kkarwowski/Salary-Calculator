import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { salariesContext, navChosenDevider } from "./utils/context";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsScreen from "./DetailsScreen";
import AddScreen from "./AddScreen";
import CustomButtonIcon from "./components/CustomTouchButton";
import CardList from "./components/CardList";
import { getData, storeData, deleteAllItems } from "./utils/dataStorage";
import { TransitionSpecs } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import CustomButtonText from "./components/CustomButtonText";
import { createContext } from "react";
import NavBar from "./components/NavBar";
export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [savedSalaries, setSavedSalaries] = useState();
  const [pressedButton, setPressedButton] = useState("Annual");

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
      // background: "#e3f0ff",
      background: "#f7d13f",

      margin: 10,
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
          color={"#2f4858"}
          onPress={() =>
            navigation.navigate("AddScreen", savedSalaries, setSavedSalaries)
          }
        />
      </View>
    );
  };
  const Home = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, padding: 20, fontWeight: "600" }}>
          Saved Salaries
        </Text>

        <NavBar />
        <AddTaskButton navigation={navigation} />
        <CardList
          navigation={navigation}
          savedSalaries={savedSalaries}
          setSavedSalaries={setSavedSalaries}
        />
      </SafeAreaView>
    );
  };

  return (
    <salariesContext.Provider value={{ savedSalaries, setSavedSalaries }}>
      <navChosenDevider.Provider value={{ pressedButton, setPressedButton }}>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Saved Salaries"
              component={HomeScreen}
              options={{
                tabBarStyle: {
                  backgroundColor: "#f7d13f",
                },

                tabBarLabelStyle: {
                  fontSize: 13,
                  color: "black",
                  fontWeight: "500",
                },
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home-circle"
                    color={"#2f4858"}
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
                  backgroundColor: "#f7d13f",
                },
                tabBarLabelStyle: {
                  fontSize: 13,
                  color: "black",
                  fontWeight: "500",
                },
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="tooltip-edit"
                    color={"#2f4858"}
                    size={30}
                  />
                ),
                // tabBarBadge: 3, tooltip-edit
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </navChosenDevider.Provider>
    </salariesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7d13f",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
});
