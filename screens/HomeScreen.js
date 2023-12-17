import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Circle from "../components/Circle";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  let revData = 0;
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedDates =
          JSON.parse(await AsyncStorage.getItem("dates")) || [];
        const storedTimes =
          JSON.parse(await AsyncStorage.getItem("times")) || [];
        const storedScores =
          JSON.parse(await AsyncStorage.getItem("scores")) || [];

          const combinedData = [];
          for (let i = 0; i < Math.max(storedDates.length, storedTimes.length, storedScores.length); i++) {
            const date = storedDates[i];
            const time = storedTimes[i];
            const score = storedScores[i];
            combinedData.push({
              date,
              time,
              score,
            });
        }
        revData = combinedData;
        setData(revData.reverse());
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    };

    loadData();
  }, []);

  const deleteItem = async (index) => {
    try {
      const updatedData = data.filter((item, i) => i !== index);
  
      const storedDates = updatedData.map((item) => item.date);
      const storedTimes = updatedData.map((item) => item.time);
      const storedScores = updatedData.map((item) => item.score);
  
      await AsyncStorage.setItem("dates", JSON.stringify(storedDates));
      await AsyncStorage.setItem("times", JSON.stringify(storedTimes));
      await AsyncStorage.setItem("scores", JSON.stringify(storedScores));
  
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };
  

  // Convert scores to numbers
  const scores = data.map((item) => Number(item.score.score));

  // Calculate total
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  // Calculate average
  const avgScore = totalScore / scores.length;

  // Round average
  const roundedAvg = Math.round(avgScore);

  const navigateToGraphs = () => {
    navigation.navigate("Graphs", {
      scores,
      times: data.map((item) => item.time),
      verageScore: roundedAvg,
    });
  };

  return (
    <View style={styles.container}>
      {/* Top 30% Section */}
      <View style={styles.topSection}>
        {/* Circular container for average score */}
        <View style={styles.circularContainer}>
          <Circle>
            <Text style={styles.avgText}>Average </Text>
            <Text style={styles.topSectionText}>{roundedAvg}</Text>
            <Text style={styles.avgTextUnit}>mg/dL </Text>
          </Circle>
        </View>

        {/* Container for the circular background */}
        <View style={styles.graphButton}>
          <TouchableOpacity onPress={navigateToGraphs}>
            <Circle>
              <Image
                source={require("../assets/graph.png")} // Replace with the actual path to your image
                style={styles.img}
              />
            </Circle>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.bottomSection}>
        {data.map((item, index) => (
          <View style={styles.cards} key={index}>
            <Card style={styles.card}>
              <Card.Content>
                {item.date && (
                  <Title>
                    <Text key={item.date}>
                      Date: {item.date.date.toString()}
                    </Text>
                  </Title>
                )}
                {item.time && (
                  <Title>
                    <Text key={item.time}>
                      Time: {item.time.time.toString()}
                    </Text>
                  </Title>
                )}
                {item.score && (
                  <Title>
                    <Text key={item.score}>
                      Score: {item.score.score.toString()}
                    </Text>
                  </Title>
                )}
              </Card.Content>
              <Card.Actions>
                <Button style={styles.delBtn} onPress={() => deleteItem(index)}>
                  <Text style={styles.btnText}>Delete</Text>
                </Button>
              </Card.Actions>
            </Card>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => navigation.navigate("New Data")}
      >
        <Text style={styles.btnText}>New Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  topSection: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightblue", // Example background color for the top section
    borderRadius: 20,
  },
  topSectionText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  avgText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSection: {
    flex: 0.7, // 70% of the screen height
  },
  card: {
    elevation: 6,
  },
  cards: {
    padding: "1.5%",
  },
  addNewBtn: {
    backgroundColor: "purple",
    width: "38%",
    height: "7%",
    borderRadius: 20,
    position: "absolute",
    bottom: "4%",
    right: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 100,
    paddingBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  delBtn: {
    backgroundColor: "purple",
    width: "30%",
    height: 50,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  circularContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  graphButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  avgTextUnit: {
    fontSize: 20,
    fontStyle: "italic",
  },
});

export default HomeScreen;