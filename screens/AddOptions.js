import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Actions } from "react-native-router-flux";
const AddOptions = (props) => {
  const options = props.options;
  const options_id = props.options_id;
  const [text, setText] = useState("");
  const addData = () => {
    if(options[0]=="null"){
      options.splice(0,1);
    }
    options.push(`${options.length}-` + text);
    options_id.push(options.length);
    Actions.refresh();
  };

  const deleteData = () => {
    options.splice(options.length - 1, 1);
    options_id.splice(options_id.length - 1, 1);
    if(options.length==0){
      options.push("null")
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
      <View style={{margin:10}}>
        <TextInput
          value={text}
          placeholder={"Program Name"}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={{flexDirection:"row"}}>
        <Button color="green" style={{flex:0.75, margin:1, borderRadius:10}} icon="checkbox-marked-circle-outline" mode="contained" onPress={() => addData()}>
          Add
        </Button>
     
     
        <Button color="grey" style={{flex:0.25, margin:1, borderRadius:10}} icon="delete" mode="contained" onPress={() => deleteData()}>
          Remove
        </Button>
      </View>
      <View style={{ flex: 1,margin:2 }}>
        <FlatList
          nestedScrollEnabled={true}
          data={options}
          renderItem={({ item }) => {
            return renderList(item);
          }}
        />
      </View>

      <View>
        <Button color="black" style={{margin:1, borderRadius:10}}
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

const renderList = (item) => {
  return (
    <View style={{ margin: 7, backgroundColor: "#332211",borderRadius:10 }}>
      <Text style={{ textAlign: "center", color: "white" }}>{item}</Text>
    </View>
  );
};

export default AddOptions;
