import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import CustomButtonIcon from "./components/CustomTouchButton";
import { storeData } from "./utils/dataStorage";
import calculateFunction from "./utils/calculateFunction";
import { salariesContext, navChosenDevider } from "./utils/context";
import { useEffect, useContext, useState } from "react";
import { VictoryPie } from "victory-native";
import NavBar from "./components/NavBar";
import AnimateNumber from "react-native-animate-number";
const DetailsScreen = ({ route, navigation }) => {
  const salary = route.params.salary;
  const pensionPercentage = route.params.pension;
  const key = route.params.key;
  console.log(salary);
  const { pressedButton, setPressedButton } = useContext(navChosenDevider);
  const [currentSalary, setCurrentSalary] = useState();

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
    }, 500);
  }, []);
  const { savedSalaries, setSavedSalaries } = useContext(salariesContext);

  const salaryPerSetting = (salary, setting) => {
    switch (setting) {
      case "Annual":
        return salary;
      case "Monthly":
        return parseFloat(salary / 12).toFixed(2);
      case "Weekly":
        return parseFloat(salary / 52).toFixed(2);
      case "Daily":
        return parseFloat(salary / 365).toFixed(2);
      case "Hourly":
        return parseFloat(salary / 2080).toFixed(2);
    }
  };

  function renderChart() {
    return (
      <View>
        <VictoryPie
          data={chartData}
          // labels={["tax", "NI", "take Home", "np"]}
          colorScale={["red", "orange", "blue", "green"]}
          animate={{
            duration: 1000,
            // onLoad: { duration: 500 },
          }}
          width={300}
          height={250}
          radius={80}
          innerRadius={70}
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
    <SafeAreaView style={styles.container}>
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
      <NavBar />

      <View style={styles.detailsContainer}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.detailsText} key={1}>
            Gross Salary
          </Text>
          <Text style={styles.detailsText} key={2}>
            £ {salary}
          </Text>
        </View>
        {chartData.map((data) => {
          const countBy = (
            salaryPerSetting(data.y, pressedButton) / 10
          ).toFixed(0);

          return (
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.detailsText} key={data.x}>
                {data.x}
              </Text>
              <Text style={styles.detailsText} key={data.y}>
                £{" "}
                <AnimateNumber
                  countBy={countBy}
                  value={currentSalary}
                  formatter={(val) => {
                    return parseFloat(val).toFixed(0);
                  }}
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
    transform: [{ translateY: -50 }],
    transform: [{ translateY: 50 }],
    borderRadius: 32,
    borderRadius: 32,
    height: "90%",
    // flex: 1,
    backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default DetailsScreen;
