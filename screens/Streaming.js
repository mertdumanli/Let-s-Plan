import React, { useState } from "react";

import { FAB, IconButton, Colors, Button } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import RNPickerSelect from "react-native-picker-select";
import { Text, View, Image, StyleSheet, FlatList, Picker } from "react-native";
const sectionsHour = [];
const sectionsMinute = [];
var a = 0;
var u = 0;
var i = 0;
const Streaming = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const update = (props) => {
    sectionsHour.splice(0, sectionsHour.length);
    for (u = 0; u < props.options.length; u++) {
      sectionsHour.push(0);
      sectionsMinute.push(0);
    }
  };
  const options = props.options;
  const options_id = props.options_id;
  const section1 = () => {
    return (
      <View style={{ flex: 1 , flexDirection:"row", justifyContent:"flex-start"}}>
        <View style={{ flex:0.50}}>
          <Picker
            selectedValue={selectedValue}
            style={{
              margin: 1,
              borderRadius: 10,
            }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            {optionsItems}
          </Picker>
        </View>
        <View style={{ flex:0.40}}>
          <Text>sadsad</Text>
        </View>
        <View style={{ flex:0.10}}>
        <IconButton
    icon="send"
    color={Colors.red800}
    size={20}
    onPress={() => {fff()}}
  />
        </View>
      </View>
    );
  };
  const fff = () => {
return (
  <Text style={{ flex:1}}>
    asdasd
  </Text>
)
  }
  const optionsItems = options.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} color="purple" />;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "grey" }}>
      <View>{update(props)}</View>
      <View>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={require("./pictures/HomeTop.jpg")}
        />

        <FAB
          style={{
            position: "absolute",
            margin: 15,
            right: 0,
            bottom: -5,
          }}
          onPress={() =>
            props.navigation.navigate("AddOptions", {
              options: options,
              options_id: options_id,
            })
          }
          small={true}
          icon="plus"
          theme={{ colors: { accent: "#006aff" } }}
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
          {props.text0}
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
          {props.text1}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", flex: 1, justifyContent: "flex-start" }}
      >
        {section1()}
      </View>
      <View>
        <Button
          color="black"
          style={{ margin: 1, borderRadius: 10 }}
          icon="check-all"
          mode="contained"
          onPress={() =>
            props.navigation.navigate("Streaming", {
              options: options,
              options_id: options_id,
            })
          }
        >
          Complete
        </Button>
      </View>
    </View>
  );
};

const renderList = (props, item) => {
  const hours = props.hours;
  const minutes = props.minutes;
  const options_id = props.options_id;
  return (
    <View
      style={{
        borderWidth: 5,
        height: 50,
        flex: 1,
        backgroundColor: "white",
        margin: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <View>
        <IconButton icon="ticket" color={Colors.blue500} size={10} />
      </View>
      <View>
        <Text
          style={{
            textAlign: "left",
            width: 275,
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {item}
        </Text>
      </View>

      <View style={{ width: 40 }}>
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) => sectionsHour.splice(0, 1)}
          //useNativeAndroidPickerStyle={false}
          items={[
            { label: `${hours[0]}`, value: `${hours[0]}`, id: `${hours[0]}` },
            { label: `${hours[1]}`, value: `${hours[1]}`, id: `${hours[1]}` },
            { label: `${hours[2]}`, value: `${hours[2]}`, id: `${hours[2]}` },
            { label: `${hours[3]}`, value: `${hours[3]}`, id: `${hours[3]}` },
          ]}
        />
      </View>

      <View style={{ textAlign: "center" }}>
        <Text>:</Text>
      </View>

      <View style={{ width: 40 }}>
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) => sectionsMinute.push(value)}
          //useNativeAndroidPickerStyle={false}
          items={[
            {
              label: `${minutes[0]}`,
              value: `${minutes[0]}`,
              id: `${minutes[0]}`,
            },
            {
              label: `${minutes[1]}`,
              value: `${minutes[1]}`,
              id: `${minutes[1]}`,
            },
            {
              label: `${minutes[2]}`,
              value: `${minutes[2]}`,
              id: `${minutes[2]}`,
            },
            {
              label: `${minutes[3]}`,
              value: `${minutes[3]}`,
              id: `${minutes[3]}`,
            },
          ]}
        />
      </View>
    </View>
  );
};
const pickerStyle = {
  placeholder: {
    color: "red",
  },
  inputAndroid: {
    color: "white",
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fc0352",
  },
});
export default Streaming;
