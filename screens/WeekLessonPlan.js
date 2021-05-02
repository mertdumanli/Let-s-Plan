import React, { Component } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  List,
  ListItem,
  Item,
  Input,
  CheckBox,
  Body,
} from "native-base";
import { View, LogBox, Animated, Easing, StyleSheet } from "react-native";
class WeekLessonPlan extends Component {
  state = {
    size: this.props.size,
    dayNumber: this.props.dayNumber,
    options: [],
    loading: true,
    texts: [],
    valueOfAnimation: new Animated.Value(0),
    text0: this.props.text0,
    text1: this.props.text1,
  };
  async componentDidMount() {
    console.log("ÇALIŞTIRILDI");
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    //LogBox.ignoreAllLogs();
    this.rotateAnimation();
    var K = 0;
    for (var d = 1; d <= this.state.dayNumber; d++) {
      for (var a = 1; a <= this.state.size; a++) {
        this.state.texts.push(K.toString() + ")");
        this.state.options.push({
          lessons: a, //1-2-3-4-5-1-2-3-4-5
          days: this.day(d), //M-M-M-M-M-T-T-T-T-T
          id: K.toString(), //For KeyExtractor
          check: false,
          TextInputs: (
            <Input
              label={K}
              placeholder="Lesson Name"
              placeholderTextColor="brown"
              defaultValue={K.toString() + ")"}
              onChangeText={(text) => this.update(this.state, text)}
            />
          ),
        });
        K = K + 1;
      }
    }

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ loading: false });
  }

  rotateAnimation() {
    this.state.valueOfAnimation.setValue(0);
    Animated.timing(this.state.valueOfAnimation, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => this.rotateAnimation());
  }
  day(d) {
    if (d == 1) {
      return "M";
    }
    if (d == 2) {
      return "T";
    }
    if (d == 3) {
      return "W";
    }
    if (d == 4) {
      return "H";
    }
    if (d == 5) {
      return "F";
    }
    if (d == 6) {
      return "S";
    }
    if (d == 7) {
      return "U";
    }
  }

  componentDidUpdate() {
    console.log("yenilendi.");
  }
  colorDay(item) {
    switch (item.days.toString()) {
      case "M":
        return (
          <Button
            disabled
            style={{ flex: 12 / 100, marginRight: 5, backgroundColor: "blue" }}
          >
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "T":
        return (
          <Button disabled danger style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "W":
        return (
          <Button disabled warning style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "H":
        return (
          <Button disabled info style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "F":
        return (
          <Button disabled success style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "S":
        return (
          <Button disabled primary style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
      case "U":
        return (
          <Button disabled light style={{ flex: 12 / 100, marginRight: 5 }}>
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {item.days.toString()}
            </Text>
          </Button>
        );
    }
  }

  list() {
    return (
      <List
        dataArray={this.state.options}
        renderRow={(item) => (
          <ListItem>
            {this.colorDay(item)}
            <Button disabled dark style={{ flex: 12 / 100, marginRight: 5 }}>
              <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.lessons.toString()}
              </Text>
            </Button>

            <Item style={{ flex: 0.7 }}>
              {item.TextInputs}
              <CheckBox color="green" checked={item.check} />
            </Item>
          </ListItem>
        )}
      ></List>
    );
  }

  update(state, text) {
    let c = false;
    state.options.slice(0, 10).map((item, index) => {
      if (item.TextInputs.props.defaultValue === text.substr(0, 2)) {
        state.texts[index] = text;
        item.check = true;
        c = true;
        Actions.refresh();
      }
    });

    state.options.slice(10).map((item, index) => {
      if (item.TextInputs.props.defaultValue === text.substr(0, 3)) {
        state.texts[index + 10] = text;
        item.check = true;
        c = true;
        Actions.refresh();
      }
    });

    if (c === false) {
      alert(
        "I can't find the index number.The text you write must begin with 1), 2), .. n). Don't Forget: You are in control of the index you changed!"
      );
    }
  }

  control(state) {
    fetch("http://8c1ec0daf45a.ngrok.io/send-Lessons", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "1",
        text0: state.text0,
        text1: state.text1,
        texts: state.texts,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch();

    /* 
    for (var q = 0; q < state.options.length; q++) {
      console.log(state.texts[q]);
    }
    console.log(state.text0);
    console.log(state.text1);
  */
  }

  render() {
    if (this.state.loading) {
      return <View></View>;
    }
    return (
      <Container>
        <Header>
          <Body>
            <Animated.Text
              style={{
                borderRadius: 10,
                textAlign: "center",
                backgroundColor: this.state.valueOfAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["rgb(10,10,10)", "rgb(222,222,222)"],
                }),
              }}
            >
              <Text style={styles.TextAnimationColor}>
                "The biggest war is the war against ignorance." -M.K.Ataturk
              </Text>
            </Animated.Text>
          </Body>
        </Header>

        <Content>{this.list()}</Content>

        <Footer>
          <Button
            full
            success
            large
            style={{ flex: 1 }}
            onPress={() => this.control(this.state)}
          >
            <Text>Click Me!</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  TextAnimationColor: {
    color: "#f00",
    fontSize: 17,
    //letterSpacing: 0, //harfler arası boşluk
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
export default WeekLessonPlan;
