import React from "react";
import Home from "./screens/Home";
import Holiday from "./screens/Holiday";
import Lesson from "./screens/Lesson";
import Streaming from "./screens/Streaming";

import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const myOptions = {
  headerTintColor: "#1bde0d",
  headerStyle: {
    backgroundColor: "#3300FF",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },

  headerRight: () => (
    <Button
      onPress={() => {
        navigation.popToTop()
      }}
      mode="contained"
      color="#000"
    ></Button>
  ),
};

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen name="Streaming" component={Streaming} />
        <Stack.Screen name="Lesson" component={Lesson} />
        <Stack.Screen name="Holiday" component={Holiday} options={myOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
