import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Actions } from "react-native-router-flux";
const Holiday = (props) => {
  return (
    <View>
      <Text>{props.value}</Text>
      <Button icon="label" mode="contained1" onPress={() => Actions.Home()}>
        Create
      </Button>
    </View>
  );
};
export default Holiday;
