import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Picker,
  Image,
  StyleSheet,
  LogBox,
  Modal,
  Alert,
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  RadioButton,
  Button,
  TextInput,
  Checkbox,
  FAB,
} from "react-native-paper";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Left,
  Right,
  Body,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
  setText0,
  setText1,
  setPicture,
  setPictureBoolean,
  setShownBoolean,
  setStatus,
  setLogin,
  setDataRegister,
  setDataRegisterLast,
  setDataLesson,
  setDataStreaming,
  setUname,
  setPass,
  set_Picture,
} from "../redux/actions";

const Home = () => {
  const [value, setValue] = useState("Streaming"); //Yeni Plan oluştururken seçim
  const [selectedValue, setSelectedValue] = useState("Streaming"); //Varolan planlardan gösterim için seçim

  const dispatch = useDispatch();
  
  const [t0, setT0] = useState(useSelector((state) => state.text0));
  const [t1, setT1] = useState(useSelector((state) => state.text1));

  const picture = useSelector((state) => state.picture);
  const pictureBoolean = useSelector((state) => state.pictureBoolean);
  const localhost = useSelector((state) => state.localhost);
  const status = useSelector((state) => state.status);

  const dataRegister = useSelector((state) => state.dataRegister); //users, passwors listesi

  const login = useSelector((state) => state.login); //giriş yapılıp yapılmadığı kontrolü

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(true); //login penceresi
  const [register, setRegister] = useState(false); //register penceresi

  const [info, setInfo] = useState("");

  const CreateActionsDirection = () => {
    //Yeni plan oluşturma
    dispatch({ type: setShownBoolean, payload: false });
    if (value === "Streaming") {
      Actions.Streaming();
    } else if (value === "Lesson") {
      Actions.Lesson();
    }
  };

  const ShowActionsDirection = () => {
    //Mevcut planlardan gösterme
    dispatch({ type: setShownBoolean, payload: true });
    if (selectedValue === "Streaming") {
      Actions.ShownStreaming();
    } else if (selectedValue === "Lesson") {
      Actions.ShownLessonPlan();
    }
  };

  const pickFromGallery = async () => {
    //Galeriden fotoğraf alma
    const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(data);

      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const pickFromCamera = async () => {
    //Fotoğraf çekme
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const handleUpload = (image) => {
    //Alınan / Çekilen fotoğrafı cloudinary'e yükleme.
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "LetsPlanPhotos");
    data.append("cloud_name", "azizpierre");

    fetch("https://api.cloudinary.com/v1_1/azizpierre/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: setPicture, payload: data.url });
        dispatch({ type: setPictureBoolean, payload: true });
      })
      .catch((err) => {
        Alert.alert("error while uploading");
      });
  };

  const pictureBottom = () => {
    //En alttaki fotoğrafı güncelleme
    if (pictureBoolean == false) {
      return require("./pictures/HomeBottom.jpg");
    }
    if (pictureBoolean == true) {
      return { uri: picture };
    }
  };

  const deletePicture = () => {
    //En alttaki fotoğrafı kaldırma (sonradan eklenen fotoğrafı varsayılan fotoğrafa çekirme)
    if (pictureBoolean == true) {
      dispatch({ type: setPictureBoolean, payload: false });
      dispatch({ type: setPicture, payload: "" });
      return require("./pictures/HomeBottom.jpg");
    }
  };

  const pressRegister = async () => {
    await setUser(false);
    await setRegister(true);
  };

  const pressLogin = async () => {
    await setUser(true);
    await setRegister(false);
  };

  const checkLogin = () => {
    let control = false;
    dataRegister.map(async (item, index) => {
      if (item.uname == username) {
        control = true;
        if (item.pass == password) {
          await dispatch({ type: setUname, payload: username });
          await dispatch({ type: setPass, payload: password });
          await dispatch({ type: setText0, payload: username });
          await setT0(username);
          await dispatch({ type: setLogin, payload: true });
          await setUser(false);
        } else {
          setInfo("Password is wrong!");
        }
      }
    });

    if (control == false) {
      setInfo("Username is not available!");
    }
  };

  const checkRegister = async () => {
    let control = true;
    if (username.length >= 4) {
      if (password.length >= 4) {
        await dataRegister.map((item, index) => {
          if (item.uname == username) {
            control = false;
          }
        });

        if (control == true) {
          let combine = [];
          await setInfo("Successfully Registered!");
          await combine.push({ uname: username, pass: password });
          await dispatch({ type: setDataRegisterLast, payload: combine[0] });
          await fetch(localhost + "/register-post", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uname: username,
              pass: password,
            }),
          })
            .then((res) => res.json())
            .catch();
        } else {
          setInfo("Username is available!");
        }
      } else {
        setInfo("Password must be at least 4 characters!");
      }
    } else {
      setInfo("Username must be at least 4 characters!");
    }
  };

  const login_ = async () => {
    await deletePicture();
    await dispatch({ type: setLogin, payload: false });
    await setUser(true);
  };

  const statu = () => {
    //ana kod
    if (status == false) {
      //diğer componentleri nativebase ile tasarladım, renk paketi için.
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });

      //veritabanından tüm verileri çektim.

      fetch(localhost + "/register-get", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch({ type: setDataRegister, payload: data }))
        .catch();

      fetch(localhost + "/streaming-get", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch({ type: setDataStreaming, payload: data }))
        .catch();

      fetch(localhost + "/lesson-get", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch({ type: setDataLesson, payload: data }))
        .catch();

      // programın başlatılması için
      dispatch({ type: setStatus, payload: true });

      return <View></View>;
    } else if (status == true) {
      {
        <View>{LogBox.ignoreAllLogs()}</View>;
      }
      if (login == false) {
        if (user == true) {
          return (
            <Modal
              animationType="slide"
              transparent={true}
              visible={user}
              onRequestClose={() => {
                setUser(false);
              }}
            >
              <Container style={{ flex: 1, top: 0 }}>
                <Header>
                  <Left style={{ flex: 1.5 }} />
                  <Body style={{ flex: 1 }}>
                    <Title>Login</Title>
                  </Body>
                  <Right style={{ flex: 1 }} />
                </Header>

                <Content>
                  <TextInput
                    style={styles.nameof}
                    label="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text.trim())}
                    mode="outlined"
                    theme={theme}
                    selectionColor="#fc8403"
                    autoCapitalize="none"
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Username and designer names may be different. The ownership
                    of the created designer names is not shown. (It is stored in
                    the database.)
                  </Text>
                  <TextInput
                    secureTextEntry
                    style={styles.nameof}
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    keyboardType="numeric" //rakamlar, -, . kullanılabilir.
                    maxLength={8}
                    mode="outlined"
                    theme={theme}
                    selectionColor="#fc8403"
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Your password can be a maximum of 8 digits, and only dots
                    and dashes can be used with the numbers you have on the
                    keyboard model that opens.
                  </Text>

                  <Text>{info}</Text>
                </Content>

                <Footer>
                  <Left style={{ flex: 1 }}>
                    <Button
                      style={{ borderRadius: 300 }}
                      color="red"
                      mode="contained"
                      onPress={() => pressRegister()}
                    >
                      <Text style={{ color: "black" }}>REGISTER</Text>
                    </Button>
                  </Left>
                  <Body style={{ flex: 1 }} />
                  <Right style={{ flex: 1 }}>
                    <Button
                      style={{ borderRadius: 300 }}
                      color="red"
                      mode="contained"
                      onPress={() => checkLogin()}
                    >
                      <Text style={{ color: "black" }}>LOGIN</Text>
                    </Button>
                  </Right>
                </Footer>
              </Container>
            </Modal>
          );
        } else if (user == false) {
          return (
            <Modal
              animationType="slide"
              transparent={true}
              visible={register}
              onRequestClose={() => {
                setRegister(false);
              }}
            >
              <Container style={{ flex: 1, top: 0 }}>
                <Header>
                  <Left style={{ flex: 1.5 }} />
                  <Body style={{ flex: 1 }}>
                    <Title>Register</Title>
                  </Body>
                  <Right style={{ flex: 1 }} />
                </Header>

                <Content>
                  <TextInput
                    style={styles.nameof}
                    label="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text.trim())}
                    mode="outlined"
                    theme={theme}
                    selectionColor="#fc8403"
                    autoCapitalize="none"
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Username and designer names may be different. The ownership
                    of the created designer names is not shown. (It is stored in
                    the database.)
                  </Text>
                  <TextInput
                    style={styles.nameof}
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    keyboardType="numeric" //rakamlar, -, . kullanılabilir.
                    maxLength={8}
                    mode="outlined"
                    theme={theme}
                    selectionColor="#fc8403"
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Your password can be a maximum of 8 digits, and only dots
                    and dashes can be used with the numbers you have on the
                    keyboard model that opens.
                  </Text>
                  <Text>{info}</Text>
                </Content>

                <Footer>
                  <Left style={{ flex: 1 }}>
                    <Button
                      style={{ borderRadius: 300 }}
                      color="red"
                      mode="contained"
                      onPress={() => checkRegister()}
                    >
                      <Text style={{ color: "black" }}>REGISTER</Text>
                    </Button>
                  </Left>
                  <Body style={{ flex: 1 }} />
                  <Right style={{ flex: 1 }}>
                    <Button
                      style={{ borderRadius: 300 }}
                      color="red"
                      mode="contained"
                      onPress={() => pressLogin()}
                    >
                      <Text style={{ color: "black" }}>LOGIN</Text>
                    </Button>
                  </Right>
                </Footer>
              </Container>
            </Modal>
          );
        }
      } else if (login == true)
        return (
          <View style={styles.main}>
            <View>
              <Image
                style={styles.topPicture}
                source={require("./pictures/HomeTop.jpg")}
              />
            </View>

            <View>
              <Text style={styles.letsPlan}>Let's Plan</Text>
            </View>

            <View>
              <Text style={styles.designedBy}>Designed by Mert Dumanlı</Text>
            </View>

            <View style={{ margin: 3, marginTop: 1 }}>
              <TextInput
                style={styles.nameof}
                label="Name of Designer"
                value={t0}
                onChangeText={(text) => setT0(text)}
                onEndEditing={() => dispatch({ type: setText0, payload: t0 })}
                mode="outlined"
                theme={theme}
                selectionColor="#fc8403"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 5,
              }}
            >
              <View style={{ width: 125 }}>
                <Button
                  color="red"
                  icon="camera"
                  mode="contained"
                  onPress={() => pickFromCamera()}
                >
                  Take
                </Button>
              </View>
              <View style={{ width: 125 }}>
                <Button
                  color="red"
                  icon="image-area"
                  mode="contained"
                  onPress={() => pickFromGallery()}
                >
                  Upload
                </Button>
              </View>
              <Checkbox
                status={pictureBoolean ? "checked" : "unchecked"}
                disabled={true}
                color={`#ffffff`}
                uncheckedColor={`#000000`}
              />
            </View>

            <View style={{ margin: 3, marginTop: -10 }}>
              <TextInput
                style={styles.nameof}
                label="Name of Plan"
                value={t1}
                onChangeText={(text) => setT1(text)}
                onEndEditing={() => dispatch({ type: setText1, payload: t1 })}
                mode="outlined"
                theme={theme}
                selectionColor="#fc8403"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 4,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                Streaming
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                Lesson Plan
              </Text>
            </View>

            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <RadioButton value="Streaming" />
                <RadioButton value="Lesson" />
              </View>
            </RadioButton.Group>

            <View
              style={{ backgroundColor: "yellow", margin: 5, borderRadius: 10 }}
            >
              <Button
                icon="label"
                mode="Text"
                onPress={() => CreateActionsDirection()}
              >
                Create
              </Button>
            </View>

            <View style={{ marginTop: 3 }}>
              <Image
                style={{
                  width: 420,
                  height: 75,
                }}
                source={require("./pictures/HomeMid.jpg")}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 7,
              }}
            >
              <Picker
                mode={"dropdown"}
                selectedValue={selectedValue}
                style={{ height: 50, width: 150, color: "#0f0" }}
                onValueChange={(newValue) => setSelectedValue(newValue)}
              >
                <Picker.Item label="Streaming" value="Streaming" />
                <Picker.Item label="Lesson" value="Lesson" />
              </Picker>
              <View>
                <Button
                  icon="bike"
                  mode="contained"
                  onPress={() => ShowActionsDirection()}
                >
                  Show Examples
                </Button>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                style={{ width: 400, height: 150, borderRadius: 25 }}
                source={pictureBottom()}
              />
            </View>

            <View>
              <FAB
                style={{ position: "absolute", right: 0, bottom: 120 }}
                small
                icon="delete"
                color="red"
                onPress={() => deletePicture()}
              />
            </View>

            <View>
              <FAB
                style={{ position: "absolute", left: 0, bottom: 600 }}
                small
                icon="exit-run"
                color="black"
                onPress={() =>
                  Alert.alert("Sign Out", "Are you sure?", [
                    {
                      text: "NO",
                      onPress: () => console.log("No Pressed"),
                    },
                    {
                      text: "YES",
                      onPress: () => login_(),
                    },
                  ])
                }
              />
            </View>
          </View>
        );
    }
  };

  return statu();
};
const theme = {
  colors: {
    primary: "#03fc0f",
  },
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#3300FF",
  },
  topPicture: {
    width: 420,
    height: 75,
  },
  letsPlan: {
    backgroundColor: "#de0d14",
    fontSize: 20,
    color: "#1bde0d",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
  designedBy: {
    backgroundColor: "yellow",
    fontSize: 20,
    color: "#1bde0d",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
  nameof: {
    color: "#FF0000",
    margin: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
