import React, { useState } from "react";
import {StyleSheet,Image,Button,View,Text,Alert,} from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, RadioButton, TextInput } from "react-native-paper";

const Lesson = (props) => {
  const text0 = props.text0;
  const text1 = props.text1;

  const [size, setSize] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: "grey" }}>
      <View>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={require("./pictures/HomeTop.jpg")}
        />
      </View>
      <View style={styles.header}>
        <Text
          style={{
            color: "blue",
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {text0}
        </Text>
        <Text
          style={{
            color: "#1bde0d",
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Let's Plan
        </Text>
        <Text
          style={{
            color: "blue",
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {text1}
        </Text>
      </View>
      <Text>Aynı Gün İçindeki Maksimum Ders Sayınız?</Text>
      <View style={{ margin: 3, marginTop: 1 }}>
        <TextInput
          style={{ color: "#FF0000", margin: 3 }}
          label="Max Number"
          onChangeText={(size) => setSize(size)}
          mode="outlined"
          theme={theme}
          selectionColor="#fc8403"
        />
      </View>
      <View>
        <Button
          title="Create Table"
          onPress={() => props.navigation.navigate("WeekLessonPlan", {
          })}
          color="#219600"
        />
      </View>
    </View>
  );
};
const theme = {
  colors: {
    primary: "#03fc0f",
  },
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fc0352",
  },
  clock: {
    color: "green",
    paddingHorizontal: 10,
    backgroundColor: "black",
  },
});
export default Lesson;
