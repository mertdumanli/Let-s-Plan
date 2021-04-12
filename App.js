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
      <Scene key="App" titleStyle={headColor.titleStyle}>
        <Scene key="Home" component={Home} initial={true} />
        <Scene key="Lesson" component={Lesson} />
        <Scene key="Streaming" component={Streaming} />
        <Scene key="Holiday" component={Holiday} />
        <Scene key="AddOptions" component={AddOptions} />
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
