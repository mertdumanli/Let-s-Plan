import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Image, LogBox } from "react-native";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem,
} from "native-base";
import { setStatus } from "../redux/actions";
const ShownLessonPlan = (props) => {
  const [datas, setDatas] = useState([]); //props
  const shownBoolean = useSelector((state) => state.shownBoolean);
  const [modal, setModal] = useState(false); //for info picture
  const allData = useSelector((state) => state.allData);
  const dispatch = useDispatch();

  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  let key = -1;
  useEffect(() => {
    {
      LogBox.ignoreAllLogs();
    }
    if (shownBoolean == true) {
      setDatas(allData[rand(allData.length)]);
    } else if (shownBoolean == false) {
      setDatas(props);
      dispatch({ type: setStatus, payload: false }); //ana sayfadaki veri çekimi yenilensin yeni eklenen data da içine alınsın.
      //Ana menüden örnek görmek istenirse burası da eklenmiş olması için.
    }
  }, []);

  function rand(x) {
    return Math.floor(Math.random() * x);
  }

  const pictureBottom = () => {
    if (datas.pictureBoolean == false) {
      return require("./pictures/HomeBottom.jpg");
    }
    if (datas.pictureBoolean == true) {
      return { uri: datas.picture };
    }
  };

  const content = (item) => {
    if (item.substring(1, 2) === ")")
      if (item.substring(0, 1) % datas.maxLesson == 0) {
        key = key + 1;
        return (
          <ListItem>
            <Left style={(styles.header, { margin: 5 })}>
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {days[key]}
              </Text>
            </Left>
            <Body style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.substr(2)}
              </Text>
            </Body>
            <Right style={styles.header} />
          </ListItem>
        );
      } else {
        return (
          <ListItem>
            <Left style={styles.header} />
            <Body style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.substr(2)}
              </Text>
            </Body>
            <Right style={styles.header} />
          </ListItem>
        );
      }
    if (item.substring(2, 3) === ")")
      if (item.substring(0, 2) % datas.maxLesson == 0) {
        key = key + 1;
        return (
          <ListItem>
            <Left style={(styles.header, { margin: 5 })}>
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {days[key]}
              </Text>
            </Left>
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.substr(3)}
              </Text>
            </Body>
            <Right style={styles.header} />
          </ListItem>
        );
      } else {
        return (
          <ListItem>
            <Left style={styles.header} />
            <Body style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.substr(3)}
              </Text>
            </Body>
            <Right style={styles.header} />
          </ListItem>
        );
      }
  };

  if (datas.length == 0) {
    return <View></View>;
  } else {
    return (
      <Container>
        <Header style={{ backgroundColor: "#ff2929" }}>
          <Left style={styles.header}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 2, alignItems: "center" }}>
            <Button transparent onPress={() => setModal(true)}>
              <Title>SHOW TO INFOs</Title>
            </Button>
          </Body>
          <Right style={styles.header}>
            <Button transparent onPress={() => Actions.Home()}>
              <Icon name="home" />
            </Button>
          </Right>
        </Header>

        <Content>
          <List
            dataArray={datas.texts}
            initialNumToRender={datas.texts.length}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(item) => content(item)}
          ></List>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(false);
            }}
          >
            <Container>
              <Header>
                <Left style={styles.header}>
                  <Button transparent onPress={() => setModal(false)}>
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body style={{ flex: 2, alignItems: "center" }}>
                  <Title>INFORMATIONS</Title>
                </Body>
                <Right style={styles.header}>
                  <Button transparent onPress={() => Actions.Home()}>
                    <Icon name="home" />
                  </Button>
                </Right>
              </Header>

              <Content>
                <Body style={{ margin: 20 }}>
                  <Image
                    style={{ width: 350, height: 350, borderRadius: 60 }}
                    source={pictureBottom()}
                  />
                  <Text
                    style={{ color: "red", fontSize: 18, fontWeight: "bold" }}
                  >
                    ~ Disagner Name ~
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}
                  >
                    ==\ {datas.text0} /==
                  </Text>
                  <Text
                    style={{ color: "red", fontSize: 18, fontWeight: "bold" }}
                  >
                    ~ Plan Name ~
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}
                  >
                    ==\ {datas.text1} /==
                  </Text>
                </Body>
              </Content>

              <Footer style={{ backgroundColor: "black" }}>
                <Body>
                  <Text style={{ textAlign: "center", color: "brown" }}>
                    This is just the information screen. It is designed with
                    React-native-modal.
                  </Text>
                </Body>
              </Footer>
            </Container>
          </Modal>
        </Content>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
});

export default ShownLessonPlan;
