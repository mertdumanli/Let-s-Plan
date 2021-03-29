import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  CheckBox,
  KeyboardAvoidingView,
} from "react-native";
import { Card, TextInput, RadioButton, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Home = (props) => {
  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [value, setValue] = useState("Streaming");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#3300FF",
      }}
    >
      <Card>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1048&q=80",
          }}
        />
      </Card>
      <Card>
        <Text
          style={{
            backgroundColor: "#de0d14",
            fontSize: 20,
            color: "#1bde0d",
            fontWeight: "bold",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Let's Plan
        </Text>
      </Card>
      <View style={{ backgroundColor: "yellow" }}>
        <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "bold" }}>
          Additions
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CheckBox disabled={true} value={true} />
        <Text
          style={{
            fontWeight: "bold",
            color: "#e810bd",
            fontSize: 18,
            margin: 2,
          }}
        >
          TV & Radio Broadcast Streaming
        </Text>
      </View>

      <KeyboardAvoidingView behavior="position">
        <View style={{ margin: 5 }}>
          <TextInput
            style={{ color: "#FF0000" }}
            label="Name of Designer"
            value={text0}
            onChangeText={(text0) => setText0(text0)}
            mode="outlined"
            theme={theme}
            selectionColor="#fc8403"
          />
        </View>
        <View style={{ margin: 5 }}>
          <TextInput
            style={{ color: "#FF0000" }}
            label="Name of Plan"
            value={text1}
            onChangeText={(text1) => setText1(text1)}
            mode="outlined"
            theme={theme}
            selectionColor="#fc8403"
          />
        </View>
        <View style={{ margin: 5 }}>
          <TextInput
            style={{ color: "#FF0000" }}
            label="Name of Branch"
            value={text2}
            onChangeText={(text2) => setText2(text2)}
            mode="outlined"
            theme={theme}
            selectionColor="#fc8403"
          />
        </View>
      </KeyboardAvoidingView>

      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
            Streaming
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
            Lesson Plan
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
            Holiday Plan
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <RadioButton value="Streaming" />
          <RadioButton value="Lesson" />
          <RadioButton value="Holiday" />
          {
            //<View><Text>{value}</Text></View> value = hangi seçenecek seçildiyse o oluyor 1-2-3
          }
        </View>
      </RadioButton.Group>

      <View>
        <Button
          icon="label"
          mode="contained"
          onPress={() => props.navigation.navigate(value)}
        >
          Create
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#03fc0f",
  },
};
export default Home