import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AddScreen from "./AddScreen";
import AddButton from "./MainScreenComponents";

export default function App() {
  const [pressedButton, setPressedButton] = useState("Annual");
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#e3f0ff",
      margin: 10,
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
      </Stack.Navigator>
    );
  }
  function SecondScreen() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Second Screen</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  const Home = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <NavBar />
        <Text>Home Screen</Text>
        {/* <Button
          title="Go to Add"
          onPress={() => {
            navigation.navigate("AddScreen");
          }}
        /> */}
        <AddButton
          onPress={() => {
            navigation.navigate("AddScreen");
          }}
        />
      </SafeAreaView>
    );
  };
  const SalariesList = () => {
    return <FlatList></FlatList>;
  };

  const NavBar = () => {
    return (
      <View style={styles.topNavContainer}>
        <ButtonNav
          onPress={() => {
            calculate(salary), setPressedButton("Annual");
          }}
          title="Annual"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            calculate(salary), setPressedButton("Monthly");
          }}
          title="Monthly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            calculate(salary), setPressedButton("Weekly");
          }}
          title="Weekly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            calculate(salary), setPressedButton("Daily");
          }}
          title="Daily"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            calculate(salary), setPressedButton("Hourly");
          }}
          title="Hourly"
        ></ButtonNav>
      </View>
    );
  };

  const ButtonNav = (props) => {
    const { onPress, title } = props;
    return (
      <Pressable
        style={{
          ...styles.buttonNav,
          // backgroundColor: title === pressedButton ? "#205a6d" : "#3596b5",
          backgroundColor: title === pressedButton ? "#002982" : "#2690ff",
        }}
        onPress={onPress}
      >
        <Text style={styles.ButtonText}>{title}</Text>
      </Pressable>
    );
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Hom"
          component={HomeScreen}
          options={{
            tabBarStyle: {
              backgroundColor: "#e3f0ff",
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-circle"
                color={color}
                size={size}
              />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="tooltip-edit"
                color={color}
                size={size}
              />
            ),
            // tabBarBadge: 3, tooltip-edit
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  buttonNav: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#2690ff",
    // marginHorizontal: 2,
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#2690ff",
    // borderColor: "black",
    borderRadius: 10,
    // borderWidth: 1,
    // padding: 5,
    width: "100%",
  },
});
