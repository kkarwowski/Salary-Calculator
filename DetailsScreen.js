import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import GobalStyles from "./utils/GobalStyles";
import { salaryPerSetting } from "./utils/salaryPerSetting";
import CustomButtonIcon from "./components/CustomTouchButton";
import { storeData } from "./utils/dataStorage";
import calculateFunction from "./utils/calculateFunction";
import { salariesContext, navChosenDevider } from "./utils/context";
import { useEffect, useContext, useState } from "react";
import { VictoryPie } from "victory-native";
// import NavBar from "./components/NavBar";
import { CountUp } from "use-count-up";
const DetailsScreen = ({ route, navigation }) => {
  const salary = route.params.salary;
  const pensionPercentage = route.params.pension;
  const key = route.params.key;
  console.log(salary);
  // const { pressedButton, setPressedButton } = useContext(navChosenDevider);
  const [currentSalary, setCurrentSalary] = useState();
  const [pressedButton, setPressedButton] = useState("Annual");

  const [chartData, setChartData] = useState([
    { x: "Tax", y: 0 },
    { x: "NI", y: 0 },
    { x: "Pension", y: 0 },
    { x: "Take home", y: parseInt(salary) },
  ]);

  useEffect(() => {
    const { totalTax, NIYear, pensionContibution, Takehome } =
      calculateFunction(salary, pensionPercentage);
    console.log(totalTax, pensionContibution, NIYear, Takehome);
    setTimeout(() => {
      setChartData([
        // { y: 150 },
        // { y: 100 },
        // { y: 50 },
        // { y: 700 },
        { x: "Tax", y: parseInt(totalTax) },
        { x: "NI", y: parseInt(NIYear) },
        { x: "Pension", y: parseInt(pensionContibution) },
        { x: "Take home", y: parseInt(Takehome) },
      ]);
    }, 100);
  }, []);
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  const ButtonNav = (props) => {
    const { onPress, title } = props;
    console.log("button", pressedButton);

    return (
      <Pressable
        style={{
          ...styles.buttonNav,
          // backgroundColor: title === pressedButton ? "#205a6d" : "#3596b5",
          // backgroundColor: title === pressedButton ? "#002982" : "#2690ff",
          backgroundColor: title === pressedButton ? "#006e5d" : "#f2fedc",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...styles.ButtonText,
            color: title === pressedButton ? "white" : "black",
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  const NavBar = () => {
    return (
      <View style={styles.topNavContainer}>
        <ButtonNav
          onPress={() => {
            setPressedButton("Annual");
          }}
          title="Annual"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton("Monthly");
          }}
          title="Monthly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton("Weekly");
          }}
          title="Weekly"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton("Daily");
          }}
          title="Daily"
        ></ButtonNav>
        <ButtonNav
          onPress={() => {
            setPressedButton("Hourly");
          }}
          title="Hourly"
        ></ButtonNav>
      </View>
    );
  };

  function renderChart() {
    return (
      <View>
        <VictoryPie
          data={chartData}
          // labels={["tax", "NI", "take Home", "np"]}
          colorScale={["red", "orange", "blue", "green"]}
          animate={{
            duration: 100,
            // onEnter: {
            //   duration: 1000,
            // },
            // onLoad: {
            //   delay: 2000,
            // },
          }}
          width={300}
          height={250}
          radius={80}
          innerRadius={65}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: () => {},
              },
            },
          ]}
        />
      </View>
    );
  }
  const deleteThisSalary = (salaryKey) => {
    navigation.goBack();
    const newSalaries = Object.assign({}, savedSalaries);
    delete newSalaries[salaryKey];
    setSavedSalaries(newSalaries);
    storeData(newSalaries);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <CustomButtonIcon
            size={40}
            color="black"
            name="arrow-back"
            size={40}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text>{key}</Text>
        {renderChart()}
        <View style={{ margin: 10 }}>
          <NavBar />
        </View>

        <View style={styles.detailsContainer}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={styles.detailsText} key={1}>
              Gross Salary
            </Text>
            <Text style={styles.detailsText} key={2}>
              £{" "}
              <CountUp
                isCounting
                end={salaryPerSetting(salary, pressedButton)}
                key={salaryPerSetting(salary, pressedButton)}
                duration={0.2}
                decimalPlaces={2}
              />
            </Text>
          </View>
          {chartData.map((data) => {
            return (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.detailsText} key={data.x}>
                  {data.x}
                </Text>
                <Text style={styles.detailsText} key={data.y}>
                  £{" "}
                  <CountUp
                    isCounting
                    end={salaryPerSetting(data.y, pressedButton)}
                    key={salaryPerSetting(data.y, pressedButton)}
                    duration={0.2}
                    decimalPlaces={2}
                  />
                </Text>
              </View>
            );
          })}
        </View>

        {/* <Text>
        total tax = {totalTax}, NI = {NIYear}, pension={pensionContibution},
        take home = {Takehome}
      </Text> */}
        <Button
          title="test"
          onPress={() => {
            const newData = chartData;
            newData.map((data) => {
              return { [data.x]: parseInt(data.y) / 2 };
            });
            console.log(newData);
          }}
        />
        <CustomButtonIcon
          size={40}
          color="red"
          name="delete"
          onPress={() => deleteThisSalary(key)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsText: { fontSize: 17 },
  detailsContainer: {
    // flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    padding: 10,
    paddingVertical: 20,
  },
  container: {
    margin: 10,
    transform: [{ translateY: -20 }],
    transform: [{ translateY: 20 }],
    borderRadius: 32,
    borderRadius: 32,
    height: "96%",
    // flex: 1,
    backgroundColor: GobalStyles.light.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonNav: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#f2fedc",
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "black",
  },
  topNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // backgroundColor: "#2690ff",
    backgroundColor: "#f2fedc",

    borderRadius: 10,
    width: "100%",
  },
});
export default DetailsScreen;
