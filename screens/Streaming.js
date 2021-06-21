import React, { useState, useEffect } from "react";

import { Actions } from "react-native-router-flux";
import { LogBox, StyleSheet, Modal, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
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
  Input,
  Icon,
  Title,
  Form,
} from "native-base";
import {
  AntDesign,
  MaterialIcons,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { setDataStreamingLast, setDataStreaming } from "../redux/actions";

let texts = [];

let hoursBegin = [];

let minutesBegin = [];

let pieceTimes = [];

let options = []; //yapılabilecek seçimler

const Streaming = (props) => {
  const dispatch = useDispatch();
  const dataStreaming = useSelector((state) => state.dataStreaming);

  //--------------------------------------------------------
  //veri tabanına gönderilecek diğer bilgiler
  const localhost = useSelector((state) => state.localhost);
  const uname = useSelector((state) => state.uname);
  const pass = useSelector((state) => state.pass);

  const [text0, setText0] = useState(useSelector((state) => state.text0));
  const [text1, setText1] = useState(useSelector((state) => state.text1));
  const [picture, setPicture] = useState(useSelector((state) => state.picture));
  const [pictureBoolean, setPictureBoolean] = useState(
    useSelector((state) => state.pictureBoolean)
  );

  const [index, setIndex] = useState(0); //options[index]
  const [currentDate, setCurrentDate] = useState();
  const [beginStreaming, setBeginStreaming] = useState(false); // sayfa açılışı
  const [available, setAvailable] = useState(false); //var mı yok mu?
  const [id, setId] = useState();
  const [newOption, setNewOption] = useState("");

  const [modal, setModal] = useState(false); //for info picture

  useEffect(() => {
    setCurrentDate(new Date().toString().substr(0, 15));
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    (async () => getBegin())();
  }, []);

  const getBegin = async () => {
    await dataStreaming.map((item) => {
      if (item.uname == uname) {
        options = item.options;
        hoursBegin = item.hoursBegin;
        minutesBegin = item.minutesBegin;
        pieceTimes = item.pieceTimes;
        texts = item.texts;
        setId(item._id);
        setAvailable(true);

        if (pictureBoolean == false) {
          //yeni resim eklenmediyse, daha önce sisteme kayıtlı resmi alıyorum.
          setPicture(item.picture);
          setPictureBoolean(item.pictureBoolean);
        }
        if (text0 == "") {
          setText0(item.text0);
        }
        if (text1 == "") {
          setText1(item.text1);
        }
      }
    });
    await setBeginStreaming(true);
  };

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(options.length - 1);
    }
  };

  const increaseIndex = () => {
    if (index < options.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const addBeginValues = async () => {
    if (options[index] == null || options[index] == "") {
      alert("Options list is empty!");
    } else {
      let i = texts.length;
      await texts.push(options[index]);
      await pieceTimes.push(0);
      if (i == 0) {
        await hoursBegin.push(0);
        await minutesBegin.push(0);
      } else {
        await hoursBegin.push(hoursBegin[i - 1]);

        let m = minutesBegin[i - 1] + pieceTimes[i - 1];

        if (m >= 60) {
          //yeni eklenen zaman diliminde dakika kısmı 60 ve üstü olma durumunda yapılacaklar.
          m = m % 60;
          hoursBegin[i] += 1; //sadece 1 eklenmesinin sebebi: en fazla 45 dakika üstüne 60 eklenebilir.
          //örneğin 00:45 iken [60 dk program süresi seçilmiş], yeni programın başlangıcı 01:45 olabilir.
        }

        await minutesBegin.push(m);
      }
      await Actions.refresh();
    }
  };

  const minutesSettingsBegin = async () => {
    await hoursBegin.map((item, index) => {
      minutesBegin[index] = item * 60 + minutesBegin[index];
    });
    return minutesBegin;
  };

  const hoursSettingsEnd = async () => {
    await minutesBegin.map((item, index) => {
      hoursBegin[index] = Math.floor(item / 60);
    });

    return hoursBegin;
  };

  const minutesSettingsEnd = async () => {
    await minutesBegin.map((item, index) => {
      minutesBegin[index] = item % 60;
    });

    return minutesBegin;
  };

  const updateMinutes = async (i) => {
    if (pieceTimes[i] != 0) {
      for (let x = i; x < pieceTimes.length - 1; x++) {
        minutesBegin[x + 1] = minutesBegin[x + 1] + 15;
      }
    } else {
      for (let x = i; x < pieceTimes.length - 1; x++) {
        minutesBegin[x + 1] = minutesBegin[x + 1] - 60;
      }
    }
    return minutesBegin;
  };

  const pivotSection = (pivot) => {
    switch (pivot) {
      case 0:
        return 15;
      case 15:
        return 30;
      case 30:
        return 45;
      case 45:
        return 60;
      default:
        return 0;
    }
  };

  const updatePieceTimes = async (i) => {
    let pivot = pieceTimes[i];
    pieceTimes[i] = await pivotSection(pivot);

    minutesBegin = await minutesSettingsBegin(); //Tüm saatleri dakikaya çevirme
    minutesBegin = await updateMinutes(i); //İlgili indexleri değiştirme

    hoursBegin = await hoursSettingsEnd(); //saatleri bulma
    minutesBegin = await minutesSettingsEnd(); //dakikaları bulma

    await Actions.refresh();
  };

  const updateAfterDeleteIndex = async (i, value) => {
    await minutesBegin.slice(i).map((item, index) => {
      minutesBegin[index + i] = item - value;
    });

    return await minutesBegin;
  };

  const deleteIndex = async (i) => {
    let value = pieceTimes[i]; //silinen işin süresini ileriki işlerin başlangıçlarından çıkarma için

    await texts.splice(i, 1);
    await minutesBegin.splice(i, 1);
    await hoursBegin.splice(i, 1);
    await pieceTimes.splice(i, 1);

    minutesBegin = await minutesSettingsBegin(); //Tüm saatleri dakikaya çevirme

    minutesBegin = await updateAfterDeleteIndex(i, value); //Sonraki her index'ten silinen indexteki işlemin süresi çıkartılıyor.

    hoursBegin = await hoursSettingsEnd(); //saatleri bulma
    minutesBegin = await minutesSettingsEnd(); //dakikaları bulma

    await Actions.refresh();
  };

  const clearAll = () => {
    texts = [];
    hoursBegin = [];
    minutesBegin = [];
    pieceTimes = [];
    Actions.refresh();
  };

  const uploadAll = async () => {
    //Eğerki eklenen işlerden biri options listesinde mevcut değilse ekleniyor.
    await texts.map((item1) => {
      let control = false;
      options.map((item0) => {
        if (item1 == item0) {
          control = true;
        }
      });
      if (control == false) {
        options.push(item1);
      }
    });
    console.log(available);

    if (available == true) {
      //güncelleme
      await fetch(localhost + "/streaming-update", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          uname: uname,
          pass: pass,
          text0: text0,
          text1: text1,
          texts: texts,
          picture: picture,
          pictureBoolean: pictureBoolean,
          hoursBegin: hoursBegin,
          minutesBegin: minutesBegin,
          pieceTimes: pieceTimes,
          currentDate: currentDate,
          options: options,
        }),
      })
        .then((res) => res.json())
        .catch();
    } else {
      //yeni username için veriyi veritabanına gönderdim.
      await fetch(localhost + "/streaming-post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uname: uname,
          pass: pass,
          text0: text0,
          text1: text1,
          texts: texts,
          picture: picture,
          pictureBoolean: pictureBoolean,
          hoursBegin: hoursBegin,
          minutesBegin: minutesBegin,
          pieceTimes: pieceTimes,
          currentDate: currentDate,
          options: options,
        }),
      })
        .then((res) => res.json())
        .catch();

      //dataStreaming dizisine bu username için olan veriler yüklendi.

      let combine = [];

      await combine.push({
        uname: uname,
        pass: pass,
        text0: text0,
        text1: text1,
        texts: texts,
        picture: picture,
        pictureBoolean: pictureBoolean,
        hoursBegin: hoursBegin,
        minutesBegin: minutesBegin,
        pieceTimes: pieceTimes,
        currentDate: currentDate,
        options: options,
      });

      await dispatch({ type: setDataStreamingLast, payload: combine[0] });
      await setAvailable(true);

     await dataStreaming.map((item, index) => {
       if(uname == item.uname){
        dataStreaming.splice(index, 1);
        dispatch({ type: setDataStreaming, payload: dataStreaming });
        return;
       }
      })

      await console.log(available);
    }
  };

  const pushOption = async () => {
    if (newOption == "") {
      await alert("Black cannot be entered!");
    } else {
      let control = false;
      await options.map((item, index) => {
        if (item == newOption) {
          control = true;
        }
      });
      await pushOpt(control);
    }
  };

  const pushOpt = async (control) => {
    if (control == true) {
      alert("Already Available!");
    } else {
      await options.push(newOption);
      await setIndex(options.length - 1);
      await Actions.refresh();
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

  const deleteOption = async () => {
    await options.splice(index, 1);
    await Actions.refresh();
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
              <Button small transparent onPress={() => deleteIndex(i)}>
                <AntDesign name="minuscircleo" size={14} color="blue" />
              </Button>
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
              <Button full onPress={() => updatePieceTimes(i)}>
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
    return <Form />;
  } else {
    return (
      <Container>
        <Header>
          <Left style={{ right: 0, flex: 0.4 }}>
            <Button
              large
              success
              rounded
              block
              transparent
              onPress={() => decreaseIndex()}
            >
              <AntDesign name="downcircle" size={24} color="green" />
            </Button>
          </Left>
          <Body style={{ flex: 2, alignItems: "center" }}>
            <Button full onPress={() => addBeginValues()}>
              <Text
                style={{
                  textAlign: "center",
                  color: "orange",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {options[index]}
              </Text>
            </Button>
          </Body>
          <Right style={{ left: 0, flex: 0.4 }}>
            <Button
              large
              success
              rounded
              block
              transparent
              onPress={() => increaseIndex()}
            >
              <AntDesign name="upcircle" size={24} color="green" />
            </Button>
          </Right>
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
                {currentDate}
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
        <Footer
          style={{ backgroundColor: "grey", borderBottomRightRadius: 70 }}
        >
          <Left>
            <Button transparent onPress={() => deleteOption()}>
              <MaterialCommunityIcons
                name="delete-empty"
                size={40}
                color="black"
              />
              <Text style={styles.DeleteOption}>{options[index]}</Text>
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <Input
              style={styles.AddOption}
              placeholderTextColor="#bbf"
              placeholder="New option"
              value={newOption}
              onChangeText={(text) => setNewOption(text)}
            />
          </Body>
          <Right>
            <Button transparent onPress={() => pushOption()}>
              <Ionicons name="add-circle-sharp" size={40} color="black" />
              <Text style={styles.Texts}>add</Text>
            </Button>
          </Right>
        </Footer>
        <Footer>
          <Left style={{ margin: 5 }}>
            <Button transparent onPress={() => clearAll()}>
              <MaterialIcons name="clear-all" size={40} color="#0b0" />
              <Text style={styles.Texts}>clear</Text>
            </Button>
          </Left>
          <Body style={{ margin: 10 }}>
            <Button transparent onPress={() => uploadAll()}>
              <Feather name="upload-cloud" size={25} color="#0b0" />
              <Text style={styles.Texts}>upload</Text>
            </Button>
          </Body>

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

export default Streaming;
