import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import GlobalStyles from "./utils/GobalStyles";
import { salaryPerSetting } from "./utils/salaryPerSetting";
import CustomButtonIcon from "./components/CustomTouchButton";
import { storeData } from "./utils/dataStorage";
import calculateFunction from "./utils/calculateFunction";
import { salariesContext } from "./utils/context";
import { useEffect, useContext, useState } from "react";
import { VictoryPie } from "victory-native";
// import MultiSlider from "@ptomasroos/react-native-multi-slider";
// import NavBar from "./components/NavBar";
import { CountUp } from "use-count-up";
import Slider from "@react-native-community/slider";
const DetailsScreen = ({ route, navigation }) => {
  const salary = route.params.salary;
  const pensionPercentage = route.params.pension;
  const key = route.params.key;
  const [raisePercentage, setRaiseParcentage] = useState(0);
  const [raisedSalary, setRaisedSalary] = useState();
  const [raisedSalaryDetails, setRaisedSalaryDetails] = useState([
    { x: "Tax", y: 0 },
    { x: "NI", y: 0 },
    { x: "Pension", y: 0 },
    { x: "Take home", y: 0 },
  ]);

  const PieColors = ["#414441", "#0086CB", "#F83C31", "#FFCD58"];
  // const { pressedButton, setPressedButton } = useContext(navChosenDevider);
  const [currentSalary, setCurrentSalary] = useState(route.params.salary);
  const [pressedButton, setPressedButton] = useState("Annual");

  const [chartData, setChartData] = useState([
    { x: "Tax", y: 0 },
    { x: "NI", y: 0 },
    { x: "Pension", y: 0 },
    { x: "Take home", y: parseInt(currentSalary) },
  ]);

  const constSetRaisedSalaryCalc = (raisedSAl) => {
    console.log("run");
    const { totalTax, NIYear, pensionContibution, Takehome } =
      calculateFunction(raisedSAl, pensionPercentage);
    setRaisedSalaryDetails([
      { x: "Tax", y: parseInt(totalTax) },
      { x: "NI", y: parseInt(NIYear) },
      { x: "Pension", y: parseInt(pensionContibution) },
      { x: "Take home", y: parseInt(Takehome) },
    ]);
  };

  useEffect(() => {
    const { totalTax, NIYear, pensionContibution, Takehome } =
      calculateFunction(currentSalary, pensionPercentage);
    setTimeout(() => {
      setChartData([
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
    return (
      <Pressable
        style={{
          ...styles.buttonNav,
          // backgroundColor: title === pressedButton ? "#205a6d" : "#3596b5",
          // backgroundColor: title === pressedButton ? "#002982" : "#2690ff",
          backgroundColor:
            title === pressedButton
              ? GlobalStyles.navActive.backgroundColor
              : GlobalStyles.navBackground.backgroundColor,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...styles.ButtonText,
            color: title === pressedButton ? "black" : "white",
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
          colorScale={PieColors}
          animate={{
            duration: 200,
          }}
          width={300}
          height={230}
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
                thousandsSeparator={","}
                end={salaryPerSetting(raisedSalaryDetails, pressedButton)}
                key={raisedSalary}
                duration={0.2}
                decimalPlaces={2}
              />
            </Text>
          </View>
          {raisePercentage > 0 && (
            <View
              key={1}
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "rgba(248, 60, 49, .3)",
              }}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 4,
                    backgroundColor: PieColors[0],
                    marginRight: 5,
                  }}
                ></View>
                <Text style={styles.detailsText} key={2}>
                  Tax
                </Text>
              </View>

              <Text style={styles.detailsText} key={3}>
                £{" "}
                <CountUp
                  thousandsSeparator={","}
                  isCounting
                  start={chartData[0].y}
                  end={salaryPerSetting(
                    raisedSalaryDetails[0].y,
                    pressedButton
                  )}
                  key={salaryPerSetting(
                    raisedSalaryDetails[0].y,
                    pressedButton
                  )}
                  duration={0.2}
                  decimalPlaces={2}
                />
              </Text>
            </View>
          )}

          {chartData.map((data, index) => {
            return (
              <>
                <View
                  key={data.x}
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 4,
                        backgroundColor: PieColors[index],
                        marginRight: 5,
                      }}
                    ></View>
                    <Text style={styles.detailsText} key={data.x}>
                      {data.x}
                    </Text>
                  </View>

                  <Text style={styles.detailsText} key={data.y}>
                    £{" "}
                    <CountUp
                      thousandsSeparator={","}
                      isCounting
                      end={salaryPerSetting(data.y, pressedButton)}
                      key={salaryPerSetting(data.y, pressedButton)}
                      duration={0.4}
                      decimalPlaces={2}
                    />
                  </Text>
                </View>
              </>
            );
          })}
        </View>

        <Text>Percentage: {raisePercentage}</Text>
        <Text></Text>
        <View style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
          <Slider
            style={{ width: "100%" }}
            tapToSeek={true}
            step={0.1}
            maximumValue={200}
            onSlidingStart={
              (value) => setRaiseParcentage(parseInt(value) / 10)
              // constSetRaisedSalaryCalc()
            }
            onValueChange={(value) => (
              setRaiseParcentage(parseInt(value) / 10),
              // setRaiseParcentage(parseInt(value) / 10),
              constSetRaisedSalaryCalc(
                (salary * (parseInt(value) / 10)) / 100 + parseFloat(salary)
              )
            )}
            onSlidingComplete={(value) =>
              setRaiseParcentage(parseInt(value) / 10)
            }
          />
        </View>

        <CustomButtonIcon
          size={40}
          color="red"
          name="delete"
          onPress={() => deleteThisSalary(key)}
        />
        <CustomButtonIcon
          size={30}
          color={GlobalStyles.darkest.backgroundColor}
          name="edit"
          onPress={() => {
            console.log("edit");
          }}
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
    // paddingVertical: 20,
  },
  flex: 1,
  container: {
    margin: 10,
    height: "100%",
    // transform: [{ translateY: -20 }],
    // transform: [{ translateY: 20 }],
    // borderRadius: 32,
    // borderRadius: 32,
    // height: "96%",
    // flex: 1,
    // backgroundColor: GlobalStyles.light.backgroundColor,
    backgroundColor: "white",
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
    backgroundColor: GlobalStyles.navBackground.backgroundColor,
    borderRadius: 10,
    width: "100%",
  },
  SliderContainer: {
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
export default DetailsScreen;
