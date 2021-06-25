import React, { Component } from "react";
import { Entypo } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Container, Header, Content, Button, Text, Footer, List,
  ListItem, Item, Input, CheckBox, Body, FooterTab } from "native-base";
import { View, LogBox, Animated, Easing, StyleSheet, Alert } from "react-native";

class WeekLessonPlan extends Component {
  state = {
    navigate: this.props.navigation.navigate,
    options: [],
    loading: true,
    texts: [],
    valueOfAnimation: new Animated.Value(0),
  };
  componentDidMount() {
    console.log("ÇALIŞTIRILDI");
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    //LogBox.ignoreAllLogs();
    this.rotateAnimation();
    var K = 0;
    for (var d = 1; d <= this.props.maxDay; d++) {
      for (var a = 1; a <= this.props.maxLesson; a++) {
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
    //  console.log("yenilendi.");
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
        initialNumToRender={this.state.options.length}
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
    fetch(this.props.localhost + "/lesson-post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: this.props.uname,
        pass: this.props.pass,
        text0: this.props.text0,
        text1: this.props.text1,
        picture: this.props.picture,
        pictureBoolean: this.props.pictureBoolean,
        maxDay: this.props.maxDay,
        maxLesson: this.props.maxLesson,
        texts: state.texts,
      }),
    })
      .then((res) => res.json())
      .catch();

    this.state.navigate("ShownLessonPlan", {
      uname: this.props.uname,
      pass: this.props.pass,
      text0: this.props.text0,
      text1: this.props.text1,
      picture: this.props.picture,
      pictureBoolean: this.props.pictureBoolean,
      maxDay: this.props.maxDay,
      maxLesson: this.props.maxLesson,
      texts: state.texts,
    });
  }

  bottom(state) {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() =>
              Alert.alert(
                "Go Home",
                "Are you sure? (Anything you add will be gone.)",
                [
                  {
                    text: "NO",
                    onPress: () => console.log("No Pressed"),
                  },
                  {
                    text: "YES",
                    onPress: () => Actions.Home(),
                  },
                ]
              )
            }
          >
            <Entypo name="home" size={24} color="black" />
            <Text>HOME</Text>
          </Button>
          <Button
            vertical
            onPress={() =>
              Alert.alert(
                "Complete",
                "Are you sure? (You will be able to see the information here again with the help of the back button in the new window; If you want, you can edit and send a new list.)",
                [
                  {
                    text: "NO",
                    onPress: () => console.log("No Pressed"),
                  },
                  {
                    text: "YES",
                    onPress: () => this.control(state),
                  },
                ]
              )
            }
          >
            <Entypo name="upload" size={24} color="black" />
            <Text>UPLOAD</Text>
          </Button>
          <Button
            vertical
            onPress={() =>
              Alert.alert(
                "Go Back",
                "Are you sure? (Anything you add will be gone.)",
                [
                  {
                    text: "NO",
                    onPress: () => console.log("No Pressed"),
                  },
                  {
                    text: "YES",
                    onPress: () => Actions.pop(),
                  },
                ]
              )
            }
          >
            <Entypo name="back" size={24} color="black" />
            <Text>BACK</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
  render() {
    if (this.state.loading) {
      return <View></View>;
    } else if (this.props.maxDay == 0 || this.props.maxLesson == 0) {
      return (
        alert(
          "The number of days for the course schedule cannot be zero or the maximum number of courses per day cannot be zero."
        ),
        Actions.pop()
      );
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

        {this.bottom(this.state)}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  TextAnimationColor: {
    color: "#f00",
    fontSize: 17,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

const mapStateToProps = (state) => ({
  localhost: state.localhost,
  uname: state.uname,
  pass: state.pass,
  text0: state.text0,
  text1: state.text1,
  picture: state.picture,
  pictureBoolean: state.pictureBoolean,
  maxDay: state.maxDay,
  maxLesson: state.maxLesson,
});

export default connect(mapStateToProps)(WeekLessonPlan);
