import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const formatDate = (rawDate) => {
  let date = new Date(rawDate);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day}-${month}-${year}`;
};

const formatTime = (rawDate) => {
  let date = new Date(rawDate);

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // Convert to 12-hour format
  const period = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12; // Handle 0 as 12 in 12-hour format
  hr = hr < 10 ? `0${hr}` : hr;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  return `${hr}:${min}:${sec} ${period}`;
};

const LoginPage = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [score, setScore] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Your Data");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  const onChangeTime = (event, selectedTime) => {
    if (selectedTime) {
      const currentTime = selectedTime;
      setTime(currentTime);
    }
    setShowTimePicker(false);
  };

  const addDate = async () => {
    try {
      const existingDates =
        JSON.parse(await AsyncStorage.getItem("dates")) || [];
      const existingTimes =
        JSON.parse(await AsyncStorage.getItem("times")) || [];
      const existingScores =
        JSON.parse(await AsyncStorage.getItem("scores")) || [];

      const newDate = { id: Date.now().toString(), date: formatDate(date) };
      const updatedDates = [...existingDates, newDate];

      const newTime = {
        id: Math.random().toString(36).substr(2, 9),
        time: formatTime(time),
      };
      const updatedTimes = [...existingTimes, newTime];

      const newScore = {
        id: Math.random().toString(36).substr(2, 9),
        score: score,
      };
      const updatedScores = [...existingScores, newScore];

      await AsyncStorage.setItem("dates", JSON.stringify(updatedDates));
      await AsyncStorage.setItem("times", JSON.stringify(updatedTimes));
      await AsyncStorage.setItem("scores", JSON.stringify(updatedScores));
      navigation.navigate("Your Data");
    } catch (error) {
      console.error("Error adding date: ", error);
    }
  };

  return (
    <View>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}
      {!showDatePicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            placeholder="Enter Date"
            style={styles.input}
            value={formatDate(date)} // Display the formatted date
            editable={false}
          />
        </Pressable>
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={time}
          onChange={onChangeTime}
          is24Hour={false}
        />
      )}
      {!showTimePicker && (
        <Pressable onPress={toggleTimePicker}>
          <TextInput
            placeholder="Enter Time"
            style={styles.input}
            value={formatTime(time)} // Display the formatted time
            editable={false}
          />
        </Pressable>
      )}

      <TextInput
        placeholder="Enter Score PP"
        value={score}
        style={[styles.input, { marginTop: 20 }]}
        onChangeText={(txt) => {
          // Allow only numeric input
          const numericValue = txt.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setScore(numericValue);
        }}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addBtn} onPress={addDate}>
        <Text style={styles.btnText}>Save!!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackBtn}
        onPress={() => navigation.navigate("Your Data")}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 55,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 20,
    marginTop: 100,
    borderWidth: 1,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "purple",
    width: "80%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  goBackBtn: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default LoginPage; 