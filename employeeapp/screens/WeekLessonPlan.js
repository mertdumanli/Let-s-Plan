import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  Alert,
  TouchableHighlight,
} from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


import { Actions } from "react-native-router-flux";
import { Card, RadioButton, TextInput } from "react-native-paper";
import { Container, Header, Content, Accordion,Button,Text } from "native-base";
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
];
class WeekLessonPlan extends Component {
  state = {};

  render() {
    return (
        <Container>
          <Button success><Text> Success </Text></Button>

          </Container>
    );
  }
}
export default WeekLessonPlan;
