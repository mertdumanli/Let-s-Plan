import React, { useState } from "react";
import { Text, View, Picker, Image} from "react-native";
import { Actions } from "react-native-router-flux";

import { Card, RadioButton, Button, TextInput } from "react-native-paper";
const hours = [];//saatler için, en aşağıda içi dolduruldu
const minutes = [];//dakikalar için, en aşağıda içi dolduruldu
const options = ["null"];//Streaming bölümünde eklenecek program isimleri için, aynı zamanda label ve value tutacak.
const options_id = ["null"];//options dizisindekilerle eş zamanlı unique key listelemek için

const Home = ({navigation: {navigate}}) => {
  const [value, setValue] = useState('Streaming');
  const [selectedValue, setSelectedValue] = useState('Streaming');
  const [text0, setText0] = useState('');
  const [text1, setText1] = useState('');
  const CreateActionsDirection = () => {
    if (value === "Streaming") {
      navigate("Streaming", {
        value: value,
        text0: text0,
        text1: text1,
        hours: hours,
        minutes: minutes,
        options: options,
        options_id: options_id
      });
    } else if (value === "Holiday") {
      navigate("Holiday", {
        value: value,
        text0: text0,
        text1: text1,
      });
    } else if (value === "Lesson") {
      navigate("Lesson", {
        value: value,
        text0: text0,
        text1: text1,
      });
    }
  };

  const ShowActionsDirection = () => {
    if (selectedValue === "Streaming") {
      Actions.Streaming();
    } else if (selectedValue === "Holiday") {
      Actions.Holiday();
    } else if (selectedValue === "Lesson") {
      Actions.Lesson();
    }
  };


  
  return (
    <View style={{ flex: 1, backgroundColor: "#3300FF" }}>
      <View>
        {hoursPush()}{minutesPush()}
      </View>
      <Card>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={require("./pictures/HomeTop.jpg")}
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

      <Card>
        <Text
          style={{
            backgroundColor: "yellow",
            fontSize: 20,
            color: "#1bde0d",
            fontWeight: "bold",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Designed by Mert Dumanlı
        </Text>
      </Card>

      <View style={{ margin: 3, marginTop: 1 }}>
        <TextInput
          style={{ color: "#FF0000", margin: 3 }}
          label="Name of Designer"
          value={text0}
          onChangeText={(text0) => setText0(text0)}
          mode="outlined"
          theme={theme}
          selectionColor="#fc8403"
        />
      </View>

      <View style={{ margin: 3, marginTop: -10 }}>
        <TextInput
          style={{ color: "#FF0000", margin: 3 }}
          label="Name of Plan"
          value={text1}
          onChangeText={(text1) => setText1(text1)}
          mode="outlined"
          theme={theme}
          selectionColor="#fc8403"
        />
      </View>

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

      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <RadioButton value="Streaming" />
          <RadioButton value="Lesson" />
          <RadioButton value="Holiday" />
        </View>
      </RadioButton.Group>

      <Card style={{ backgroundColor: "yellow", margin: 5, borderRadius: 10 }}>
        <Button
          icon="label"
          mode="Text"
          onPress={() => CreateActionsDirection()}
        >
          Create
        </Button>
      </Card>

      <Card style={{ marginTop: 3 }}>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={require("./pictures/HomeMid.jpg")}
        />
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 7,
        }}
      >
        <Picker
          mode={"dropdown"}
          selectedValue={selectedValue}
          style={{ height: 50, width: 150, color: "#0f0" }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Streaming" value="Streaming" />
          <Picker.Item label="Lesson" value="Lesson" />
          <Picker.Item label="Holiday" value="Holiday" />
        </Picker>
        <View>
          <Button
            icon="bike"
            mode="contained"
            onPress={() => ShowActionsDirection()}
          >
            Show Examples
          </Button>
        </View>
      </View>

      <Card>
        <Image
          style={{ width: 420, height: 300 }}
          source={require("./pictures/HomeBottom.jpg")}
        />
      </Card>
    </View>
  );
};
const theme = {
  colors: {
    primary: "#03fc0f",
  },
};
const hoursPush = () => {
  for (let i0 = 0; i0 < 24; i0++) {
    hours.push(i0);
  }
};

const minutesPush = () => {
  for (let i1 = 0; i1 < 60; i1++) {
    minutes.push(i1);
  }
};

export default Home;