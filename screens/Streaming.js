import React, { useState } from "react";

import { FAB, IconButton, Colors, Button } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import RNPickerSelect from "react-native-picker-select";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";

var IndexOfItemsBegin = 0;
var IndexOfItemsEnd = 0;

const Streaming = (props) => {
  const [sectionhBegin, setSectionhBegin] = useState("null");
  const [sectionmBegin, setSectionmBegin] = useState("null");

  const [sectionhEnd, setSectionhEnd] = useState("null");
  const [sectionmEnd, setSectionmEnd] = useState("null");

  const options = props.options;

  const hours = useSelector((state) => state.hours);
  const minutes = useSelector((state) => state.minutes);
  const localhost = useSelector((state) => state.localhost);

  const text0 = useSelector((state) => state.text0);
  const text1 = useSelector((state) => state.text1);
  const picture = useSelector((state) => state.picture);

  const sectionsHoursBegin = props.sectionsHoursBegin;
  const sectionsMinutesBegin = props.sectionsMinutesBegin;

  const sectionsHoursEnd = props.sectionsHoursEnd;
  const sectionsMinutesEnd = props.sectionsMinutesEnd;

  const up = (K, Type) => {
    //Index numaralarında değişiklik
    //K: up/down up:1
    //Type:0 Begin, Type:1 End
    if (Type == 0) {
      //IndexOfItemsBegin
      if (K == 1) {
        if (IndexOfItemsBegin != options.length - 1)
          IndexOfItemsBegin = IndexOfItemsBegin + 1;
      } else {
        if (IndexOfItemsBegin != 0) IndexOfItemsBegin = IndexOfItemsBegin - 1;
      }
    } else if (Type == 1) {
      //IndexOfItemsEnd
      if (K == 1) {
        if (IndexOfItemsEnd != options.length - 1)
          IndexOfItemsEnd = IndexOfItemsEnd + 1;
      } else {
        if (IndexOfItemsEnd != 0) IndexOfItemsEnd = IndexOfItemsEnd - 1;
      }
    }
    Actions.refresh();
  };

  const upgradeTime = (Type) => {
    //Saatleri güncelleme
    //Type:0 Begin, Type:1 End
    if (Type == 0) {
      if (sectionhBegin != "null") {
        sectionsHoursBegin[IndexOfItemsBegin] = sectionhBegin;
      } else {
        sectionsHoursBegin[IndexOfItemsBegin] = "null";
      }
      if (sectionmBegin != "null") {
        sectionsMinutesBegin[IndexOfItemsBegin] = sectionmBegin;
      } else {
        sectionsMinutesBegin[IndexOfItemsBegin] = "null";
      }
    }
    if (Type == 1) {
      if (sectionhEnd != "null") {
        sectionsHoursEnd[IndexOfItemsEnd] = sectionhEnd;
      } else {
        sectionsHoursEnd[IndexOfItemsEnd] = "null";
      }
      if (sectionmEnd != "null") {
        sectionsMinutesEnd[IndexOfItemsEnd] = sectionmEnd;
      } else {
        sectionsMinutesEnd[IndexOfItemsEnd] = "null";
      }
    }
    Actions.refresh();
  };

  const maxControl = () => {
    //Sayfa açılırken index numaralarının 0 ile size-1 ayarı.(index olarak)
    if (IndexOfItemsBegin > options.length - 1 && options.length - 1 != -1) {
      IndexOfItemsBegin = options.length - 1;
    }

    if (IndexOfItemsEnd > options.length - 1 && options.length - 1 != -1) {
      IndexOfItemsEnd = options.length - 1;
    }
  }; //Sayfa açılınca ilk yapılan işlem olduğundan Actions.refresh() ekleme gereği görmedim -gereksiz-.

  const submitData = () => {
    fetch(localhost + "/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 1,
        text0: text0,
        text1: text1,
        options: options,
        sectionsMinutesBegin: sectionsMinutesBegin,
        sectionsHoursBegin: sectionsHoursBegin,
        sectionsMinutesEnd: sectionsMinutesEnd,
        sectionsHoursEnd: sectionsHoursEnd,
        picture: picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch();
  };

  const hoursItems = (hours) => {
    //RNPickerSelect item için gerekli dizi tanımlanması.(Saat kısmı)
    let liste = [];
    for (let i = 0; i < 24; i++) {
      liste.push({
        label: `${hours[i]}`,
        value: `${hours[i]}`,
        id: `${hours[i]}`,
      });
    }
    return liste;
  };
  const minutesItems = (minutes) => {
    //RNPickerSelect item için gerekli dizi tanımlanması.(Dakika kısmı)
    let liste = [];
    for (let i = 0; i < 60; i++) {
      liste.push({
        label: `${minutes[i]}`,
        value: `${minutes[i]}`,
        id: `${minutes[i]}`,
      });
    }

    return liste;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "grey" }}>
      <View>{maxControl()}</View>
      <View>
        <Image
          style={{
            width: 420,
            height: 75,
          }}
          source={require("./pictures/HomeTop.jpg")}
        />

        <FAB
          style={{
            position: "absolute",
            margin: 15,
            right: 0,
            bottom: -5,
          }}
          onPress={() =>
            props.navigation.navigate("AddOptions", {
              options: options,
              sectionsMinutesBegin: sectionsMinutesBegin,
              sectionsHoursBegin: sectionsHoursBegin,
              sectionsMinutesEnd: sectionsMinutesEnd,
              sectionsHoursEnd: sectionsHoursEnd,
            })
          }
          small={true}
          icon="plus"
          theme={{ colors: { accent: "#006aff" } }}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 40,
        }}
      >
        <View>
          <IconButton
            icon="arrow-up-box"
            color={Colors.red800}
            size={20}
            onPress={() => {
              up(1, 0);
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: "#33ffff" }}>
            Index {IndexOfItemsBegin}
          </Text>
        </View>
        <View>
          <IconButton
            icon="arrow-down-box"
            color={Colors.red800}
            size={20}
            onPress={() => {
              up(-1, 0);
            }}
          />
        </View>
        <View style={{ width: 100, marginTop: 7 }}>
          <RNPickerSelect
            style={pickerStyle}
            placeholder={{
              label: "Hour",
              value: "null",
            }}
            onValueChange={(value) => setSectionhBegin(value)}
            useNativeAndroidPickerStyle={false}
            items={hoursItems(hours)}
          />
        </View>

        <View style={{ width: 100, marginTop: 7 }}>
          <RNPickerSelect
            style={pickerStyle}
            placeholder={{
              label: "Minute",
              value: "null",
            }}
            onValueChange={(value) => setSectionmBegin(value)}
            useNativeAndroidPickerStyle={false}
            items={minutesItems(minutes)}
          />
        </View>

        <View style={{ marginTop: -3 }}>
          <IconButton
            icon="send-circle-outline"
            color={Colors.orange900}
            size={25}
            onPress={() => {
              upgradeTime(0);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 40,
        }}
      >
        <View>
          <IconButton
            icon="arrow-up-box"
            color={Colors.red800}
            size={20}
            onPress={() => {
              up(1, 1);
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: "#33ffff" }}>
            Index {IndexOfItemsEnd}
          </Text>
        </View>
        <View>
          <IconButton
            icon="arrow-down-box"
            color={Colors.red800}
            size={20}
            onPress={() => {
              up(-1, 1);
            }}
          />
        </View>
        <View style={{ width: 100, marginTop: 7 }}>
          <RNPickerSelect
            style={pickerStyle}
            placeholder={{
              label: "Hour",
              value: "null",
            }}
            onValueChange={(value) => setSectionhEnd(value)}
            useNativeAndroidPickerStyle={false}
            items={hoursItems(hours)}
          />
        </View>

        <View style={{ width: 100, marginTop: 7 }}>
          <RNPickerSelect
            style={pickerStyle}
            placeholder={{
              label: "Minute",
              value: "null",
            }}
            onValueChange={(value) => setSectionmEnd(value)}
            useNativeAndroidPickerStyle={false}
            items={minutesItems(minutes)}
          />
        </View>

        <View style={{ marginTop: -3 }}>
          <IconButton
            icon="send-circle-outline"
            color={Colors.orange900}
            size={25}
            onPress={() => {
              upgradeTime(1);
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, margin: 2 }}>
        <FlatList
          nestedScrollEnabled={true}
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return renderList(props, item);
          }}
        />
      </View>
      <View>
        <Button
          color="black"
          style={{ margin: 1, borderRadius: 10 }}
          icon="check-all"
          mode="contained"
          onPress={() => submitData()}
        >
          Complete
        </Button>
      </View>
    </View>
  );
};

const renderList = (props, item) => {
  const sectionsHoursBegin = props.sectionsHoursBegin;
  const sectionsMinutesBegin = props.sectionsMinutesBegin;

  const sectionsHoursEnd = props.sectionsHoursEnd;
  const sectionsMinutesEnd = props.sectionsMinutesEnd;
  return (
    <View
      style={{
        borderWidth: 5,
        height: 50,
        flex: 1,
        backgroundColor: "white",
        margin: 5,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View>
        <IconButton icon="ticket" color={Colors.blue500} size={10} />
      </View>
      <View>
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: "bold",
            color: "black",
            width: 220,
          }}
        >
          {item}
        </Text>
      </View>
      <View style={{ width: 50, alignItems: "center" }}>
        <Text style={{ color: "purple", backgroundColor: "black" }}>
          |Begin|
        </Text>
        <Text style={{ color: "purple", backgroundColor: "black" }}>|End|</Text>
      </View>
      <View style={{ width: 100, alignItems: "center" }}>
        <Text style={styles.clock}>
          {sectionsHoursBegin[item.slice(0, 1)]} :{" "}
          {sectionsMinutesBegin[item.slice(0, 1)]}
        </Text>
        <Text style={styles.clock}>
          {sectionsHoursEnd[item.slice(0, 1)]} :{" "}
          {sectionsMinutesEnd[item.slice(0, 1)]}
        </Text>
      </View>
    </View>
  );
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
const pickerStyle = {
  placeholder: {
    color: "blue",
  },
  inputAndroid: {
    color: "green",
    paddingHorizontal: 10,
    backgroundColor: "black",
    borderRadius: 15,
  },
};

export default Streaming;
