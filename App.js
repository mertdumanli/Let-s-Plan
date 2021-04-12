import React from "react";
import { Router, Scene } from "react-native-router-flux";

import Home from "./screens/Home";
import Lesson from "./screens/Lesson";
import Streaming from "./screens/Streaming";
import Holiday from "./screens/Holiday";
import AddOptions from "./screens/AddOptions";

const App = () => {
  return (
    <Router>
      <Scene key="App">
        <Scene
          key="Home"
          component={Home}
          initial={true}
          titleStyle={headColor.titleStyle}
        />
        <Scene
          key="Lesson"
          component={Lesson}
          titleStyle={headColor.titleStyle}
        />
        <Scene
          key="Streaming"
          component={Streaming}
          titleStyle={headColor.titleStyle}
        />
        <Scene
          key="Holiday"
          component={Holiday}
          titleStyle={headColor.titleStyle}
        />
        <Scene
          key="AddOptions"
          component={AddOptions}
          titleStyle={headColor.titleStyle}
        />
      </Scene>
    </Router>
  );
};

const headColor = {
  titleStyle: {
    color: "#f0f",
    fontSize: 30,
    fontWeight: "700",
    flexDirection: "row",
    borderRadius: 25,
    textAlign: "center",
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: "#00f",
  },
};
export default App;
