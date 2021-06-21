import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Provider } from "react-redux";
import store from "./redux/app";
import Home from "./screens/Home";
import Lesson from "./screens/Lesson";
import Streaming from "./screens/Streaming";
import WeekLessonPlan from "./screens/WeekLessonPlan";
import ShownStreaming from "./screens/ShownStreaming";
import ShownLessonPlan from "./screens/ShownLessonPlan";
function App() {
  return (
    <Router>
      <Scene key="App" titleStyle={headColor.titleStyle}>
        <Scene key="Home" component={Home} initial={true} title="Home"/>
        <Scene key="Lesson" component={Lesson} title="Lesson"/>
        <Scene key="WeekLessonPlan" component={WeekLessonPlan} title="Week Lesson Plan"/>
        <Scene key="Streaming" component={Streaming} title="Streaming"/>
        <Scene key="ShownStreaming" component={ShownStreaming} title="Shown Streaming"/>
        <Scene key="ShownLessonPlan" component={ShownLessonPlan} title="Shown Lesson Plan"/>
      </Scene>
    </Router>
  );
}

const headColor = {
  titleStyle: {
    color: "#aff",
    fontSize: 30,
    fontWeight: "700",
    flexDirection: "row",
    borderRadius: 25,
    textAlign: "center",
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: "#808080",
  },
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
