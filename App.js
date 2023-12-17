// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./screens/LoginPage";
import HomeScreen from "./screens/HomeScreen";
import GraphScreen from "./screens/GraphScreen";
import Charts from "./screens/Charts";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen
          name="New Data"
          component={LoginPage}
          options={{
            headerLeft: null,
          }}
        />
        {/* <Stack.Screen
          name="Charts"
          component={Charts}
          options={{
            headerLeft: null,
          }}
        /> */}
        <Stack.Screen name="Graphs" component={GraphScreen} />

        <Stack.Screen
          name="Your Data"
          component={HomeScreen}
          options={{
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
