import React, { useEffect } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { TextInput, FAB } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import { setMaxDay, setMaxLesson } from "../redux/actions";
const Lesson = () => {
  const text0 = useSelector((state) => state.text0);
  const text1 = useSelector((state) => state.text1);
  const picture = useSelector((state) => state.picture);
  const pictureBoolean = useSelector((state) => state.pictureBoolean);

  const maxDay = useSelector((state) => state.maxDay);
  const maxLesson = useSelector((state) => state.maxLesson);
  const dispatch = useDispatch();

  useEffect(() => {
    if (maxDay > 7) {
      dispatch({ type: setMaxDay, payload: 7 });
    }
  }, [maxDay]);

  const endEditing = (x) => {
    let q = maxDay;
    let p = maxLesson;
    if (x == 0) {
      //maxDay
      if (q == 1 || q == 2 || q == 3 || q == 4 || q == 5 || q == 6 || q == 7) {
      } else {
        dispatch({ type: setMaxDay, payload: 5 });
      }
    } else if (x == 1) {
      //maxLesson
      if (p == 1 || p == 2 || p == 3 || p == 4 || p == 5 || p == 6 || p == 7) {
      } else {
        dispatch({ type: setMaxLesson, payload: 5 });
      }
    }
  };

  const pictureBottom = () => {
    if (pictureBoolean == false) {
      return require("./pictures/HomeBottom.jpg");
    }
    if (pictureBoolean == true) {
      return { uri: picture };
    }
  };

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
      <View>
        <Text>Haftada Kaç gün dersin var? (default:5)</Text>
      </View>
      <View style={{ margin: 3, marginTop: 1 }}>
        <TextInput
          style={{ color: "#FF0000", margin: 3 }}
          maxLength={1}
          label="Max Number"
          keyboardType="numeric"
          value={maxDay.toString()}
          onChangeText={(dayNumber) =>
            dispatch({ type: setMaxDay, payload: dayNumber })
          }
          onEndEditing={() => endEditing(0)}
          mode="outlined"
          theme={theme}
          selectionColor="#fc8403"
        />
      </View>
      <View>
        <Text>Aynı Gün İçindeki Maksimum Ders Sayınız? (default:5)</Text>
      </View>
      <View style={{ margin: 3, marginTop: 1 }}>
        <TextInput
          style={{ color: "#FF0000", margin: 3 }}
          maxLength={1}
          label="Max Number"
          keyboardType="numeric"
          value={maxLesson.toString()}
          onChangeText={(size) =>
            dispatch({ type: setMaxLesson, payload: size })
          }
          onEndEditing={() => endEditing(1)}
          mode="outlined"
          theme={theme}
          selectionColor="#fc8403"
        />
      </View>

      <View>
        <Button
          title="Create Table"
          onPress={() => Actions.WeekLessonPlan()}
          color="#219600"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <Image
          style={{ width: 350, height: 350, borderRadius: 80 }}
          source={pictureBottom()}
        />
      </View>

      <View style={{}}>
        <Text
          style={{ textAlign: "center", color: "red", fontStyle: "italic" }}
        >
          photo
        </Text>
      </View>
      <FAB
        style={{ position: "absolute", left: 0, bottom: 0 }}
        icon="home"
        color="yellow"
        onPress={() => Actions.Home()}
      />
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
