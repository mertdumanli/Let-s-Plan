export const initialState = {

  status: true,//Home ekranında önce veri çekimi için
  login: true,//Giriş yapılmadan erişim engellemek için
//login,status false olacak ayrıca Home.js de const [user, setUser] = useState(false); true yapılacak.

  dataRegister: [],//kullanıcı bilgileri
  dataStreaming: [],//Streaming bilgileri
  dataLesson: [],//Lesson bilgileri
  
  localhost: "http://2c054bee6e54.ngrok.io",
  
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

 
  //↓for Streaming↓//
  sectionsHoursBegin : [],
  sectionsMinutesBegin : [],
  sectionsHoursEnd : [],
  sectionsMinutesEnd : [],
  
  
  texts : [],



  date: "",//oluşturulma zamanları


  uname: "",
  pass: "",
};
