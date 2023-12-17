import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Circle from "../components/Circle";
import GlucoseInfoCard from "../components/GlucoseInfoCard";

const chartConfig = {
  backgroundGradientFrom: "#000",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#000",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const GraphScreen = ({ route }) => {
  const { scores, times, averageScore } = route.params;

  if (!scores || !times || scores.length === 0 || times.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available for the graph</Text>
      </View>
    );
  }

  const reversedScores = scores.slice().reverse();
  const reversedTimes = times.slice().reverse();

  const data = {
    labels: reversedTimes.map((time) => time.time.toString()),
    datasets: [
      {
        data: reversedScores,
      },
    ],
  };

  console.log(data);

  const calculateChartWidth = () => {
    const labelCount = data.labels.length;
    const baseWidth = Dimensions.get("window").width;
    const extraWidth = labelCount * labelCount * 5; // Adjust the multiplier as needed
    return baseWidth + extraWidth;
  };

  return (
    <View style={styles.container}>
      <Text>Score vs Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LineChart
          data={data}
          width={calculateChartWidth()}
          height={300}
          yAxisLabel=""
          yAxisInterval={1}
          minTime={data.labels[Math.max(0, data.labels.length - 20)]}
          maxTime={data.labels[data.labels.length - 1]}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 2,
          }}
        />
      </ScrollView>
      <View style={styles.glucoStyle}>
        <GlucoseInfoCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circularContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avgText: {
    fontSize: 20,
  },
  topSectionText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  glucoStyle:{
    paddingBottom:"40%"
  }
});

export default GraphScreen;
