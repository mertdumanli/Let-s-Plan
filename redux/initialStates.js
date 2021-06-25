export const initialState = {

  status: false,//Home ekranında önce veri çekimi için
  login: false,//Giriş yapılmadan erişim engellemek için

  dataRegister: [],//kullanıcı bilgileri
  dataStreaming: [],//Streaming bilgileri
  dataLesson: [],//Lesson bilgileri
  
  localhost: "ngrok localhost -http(s) address-)",
  
  text0: "",//Designer Name
  text1: "",//Plan Name
  
  picture: "null",//picture uri
  pictureBoolean: false,//picture uri t/f
  

  shownBoolean: false,
  //true: veri tabanından çekeceğim
  //false: yeni oluşturulmuş datayı ekrana vereceğim.

  //↓for Lesson Plan↓//
  maxDay: 5,
  maxLesson: 5,

  texts : [],
  uname: "",
  pass: "",
};
