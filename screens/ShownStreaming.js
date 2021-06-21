import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { LogBox, StyleSheet, Modal, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Button,
  Footer,
  List,
  Text,
  Card,
  CardItem,
  Icon,
  Title,
  Form,
} from "native-base";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

let texts = [];
let hoursBegin = [];
let minutesBegin = [];
let pieceTimes = [];

let text0 = "";
let text1 = "";

let picture = "";
let pictureBoolean = false;

let creationDate = "";

const ShownStreaming = () => {
  const [beginStreaming, setBeginStreaming] = useState(false); // sayfa açılışı
  const [modal, setModal] = useState(false); //for info picture
  const dataStreaming = useSelector((state) => state.dataStreaming);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    (async () => getBegin())();
  }, [beginStreaming]);

  function rand(x) {
    return Math.floor(Math.random() * x);
  }

  const regulation = (no) => {
    let item = dataStreaming[no];

    hoursBegin = item.hoursBegin;
    minutesBegin = item.minutesBegin;
    pieceTimes = item.pieceTimes;
    texts = item.texts;
    picture = item.picture;
    pictureBoolean = item.pictureBoolean;
    text0 = item.text0;
    text1 = item.text1;
    creationDate = item.currentDate;
    return;
  };

  const getBegin = async () => {
    let no = await rand(dataStreaming.length);
    await regulation(no);
    await setBeginStreaming(true);
  };

  const pictureBottom = () => {
    if (pictureBoolean == false) {
      return require("./pictures/HomeBottom.jpg");
    }
    if (pictureBoolean == true) {
      return { uri: picture };
    }
  };

  const content = (item, i) => {
    return (
      <Content>
        <Card>
          <CardItem>
            <Left
              style={{
                flex: 0.7,
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {hoursBegin[i]}:{minutesBegin[i]}
              </Text>
            </Left>
            <Body
              style={{
                flex: 1,
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item}
              </Text>
            </Body>

            <Right style={{ flex: 0.5 }}>
              <Button full disabled>
                <Text
                  style={{
                    textAlign: "center",
                    color: "orange",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {pieceTimes[i]}
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  };

  if (beginStreaming == false) {
    console.log("1");
    return <Form />;
  } else {
    console.log("2");
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>

        <Content>
          <Form style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button transparent onPress={() => setModal(true)}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "thistle", //devedikeni mor-pembe gibi
                  borderRadius: 40,
                  borderStyle: "dashed",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "brown",
                  marginTop: 10,
                  marginLeft: 80,
                  marginRight: 80,
                  marginBottom: 10,
                }}
              >
                {creationDate}
              </Text>
            </Button>
          </Form>

          <List
            dataArray={texts}
            initialNumToRender={texts.length}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(item, x, i) => content(item, i)}
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
                    ==\ {text0} /==
                  </Text>
                  <Text
                    style={{ color: "red", fontSize: 18, fontWeight: "bold" }}
                  >
                    ~ Plan Name ~
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}
                  >
                    ==\ {text1} /==
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

        <Footer>
          <Left style={{ margin: 5 }}>
            <Button transparent onPress={() => setBeginStreaming(false)}>
              <MaterialCommunityIcons
                name="database-refresh"
                size={40}
                color="#0b0"
              />
              <Text style={styles.Texts}>refresh</Text>
            </Button>
          </Left>

          <Right style={{ margin: 5 }}>
            <Button transparent onPress={() => Actions.Home()}>
              <FontAwesome5 name="home" size={25} color="#0b0" />
              <Text style={styles.Texts}>Home</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  Texts: {
    textAlign: "center",
    color: "orange",
    fontSize: 17,
    fontWeight: "bold",
  },
  DeleteOption: {
    textAlign: "center",
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
  },
  AddOption: {
    textAlign: "center",
    color: "black",
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default ShownStreaming;
