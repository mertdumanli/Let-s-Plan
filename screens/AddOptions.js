import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Actions } from "react-native-router-flux";
const AddOptions = (props) => {
  const options = props.options;
  const sectionsHoursBegin = props.sectionsHoursBegin;
  const sectionsMinutesBegin = props.sectionsMinutesBegin;

  const sectionsHoursEnd = props.sectionsHoursEnd;
  const sectionsMinutesEnd = props.sectionsMinutesEnd;

  const [text, setText] = useState("");
  const addData = () => {
    if (options[0] == "null") {
      options.splice(0, 1);
      sectionsHoursBegin.splice(0, 1);
      sectionsMinutesBegin.splice(0, 1);
      sectionsHoursEnd.splice(0, 1);
      sectionsMinutesEnd.splice(0, 1);
    }
    options.push(`${options.length}-` + text);
    sectionsHoursBegin.push("null");
    sectionsMinutesBegin.push("null");

    sectionsHoursEnd.push("null");
    sectionsMinutesEnd.push("null");

    Actions.refresh();
  };

  const deleteData = () => {
    let a = options.length - 1;
    options.splice(a, 1);
    sectionsHoursBegin.splice(a, 1);
    sectionsMinutesBegin.splice(a, 1);
    sectionsHoursEnd.splice(a, 1);
    sectionsMinutesEnd.splice(a, 1);
    if (a == 0) {
      options.push("null");
      sectionsHoursBegin.push("null");
      sectionsMinutesBegin.push("null");
      sectionsHoursEnd.push("null");
      sectionsMinutesEnd.push("null");
    }
    Actions.refresh();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#ebe2e1", margin: 5 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#612019",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ↓↓↓Program Name↓↓↓
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          value={text}
          placeholder={"Program Name"}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          color="green"
          style={{ flex: 0.75, margin: 1, borderRadius: 10 }}
          icon="checkbox-marked-circle-outline"
          mode="contained"
          onPress={() => addData()}
        >
          Add
        </Button>

        <Button
          color="grey"
          style={{ flex: 0.25, margin: 1, borderRadius: 10 }}
          icon="delete"
          mode="contained"
          onPress={() => deleteData()}
        >
          Remove
        </Button>
      </View>
      <View style={{ flex: 1, margin: 2 }}>
        <FlatList
          nestedScrollEnabled={true}
          initialNumToRender={options.length}//değiştirdim
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return renderList(item);
          }}
        />
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
              sectionsHoursBegin: sectionsHoursBegin,
              sectionsMinutesBegin: sectionsMinutesBegin,

              sectionsHoursEnd: sectionsHoursEnd,
              sectionsMinutesEnd: sectionsMinutesEnd,
            })
          }
        >
          Complete
        </Button>
      </View>
    </View>
  );
};

const renderList = (item) => {
  return (
    <View style={{ margin: 7, backgroundColor: "#332211", borderRadius: 10 }}>
      <Text style={{ textAlign: "center", color: "white" }}>{item}</Text>
    </View>
  );
};

export default AddOptions;
