import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import {useSelector, useDispatch} from 'react-redux'


const ShownStreaming = () => {
 
 
  const [datas, setDatas] = useState([]);
  const localhost = useSelector((state) => state.localhost);
  const text0 = useSelector((state) => state.text0);


  useEffect(() => {
      fetch(localhost + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDatas(data))
      .catch();
  }, []);


  if (datas.length == 0) {
    return <View></View>;
  } else {
    return (
      <View>
        <View>
          {/*<Text>size: {datas.length}</Text>
          */}<Text>
            {/*datas[0].texts[0]}
            {console.log(datas)*/}
          </Text>


<Text>
  {text0}
</Text>
        </View>
      </View>
    );
  }
};

export default ShownStreaming;
