# Let-s-Plan
This project is the project I am working on for the graduation project 2 course.  
Front-end: React Native  
Back-end: MongoDB  
Let's plan is abbreviated and it's just the name of the project. It is a system where they can organize their holiday plans, live broadcast streaming plans, lesson plans with certain templates and add self-plans to the general data.
  
The formation stages of the project  
Install Visual Studio Code, Node.js, create account on MongoDB.  
  
The Installations I Have Done ↓  
  
npm install -g expo-cli  
expo init employeeapp  

React Navigation ↓  
npm install @react-navigation/native  
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view  
npm install @react-navigation/stack
  
npm install react-native-paper  
npm install react-native-router-flux  
npm install react-native-screens  
npm install @react-native-picker/picker  
npm install --save native-base  
react-native link native-base  
npm install -g create-react-app  
expo install expo-font  
  
-For localhost-  
npm install ngrok -g  
  
Extras that have been added but not yet used  
npm install @react-native-community/datepicker --save  
react-native link  
npm install redux react-redux

Requirements for operation  
-3 different cmd-
  
1)  Running Program
for "npm start"  
While preparing the project, the same wireless connection was used to the computer and the phone. Therefore, used expo locally.  
  
2)  Conflict problem in local Ip4 due to local network usage(port 3000)
for "ngrok http 3000"  
'Now you will get a Unique valid url where your local server which is running on port 3000 is redirected to that url,now you can use that url provided by ngrok instead of 10.0.2.2'  
  
3)  Running Server (MongoDB)
for "nodemon app"  