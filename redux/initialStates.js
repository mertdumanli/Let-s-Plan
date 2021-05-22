export const initialState = {

  status: false,//Home ekranında önce veri çekimi için
  login: true,//Giriş yapılmadan erişim engellemek için
//login false olacak ayrıca Home.js de const [user, setUser] = useState(false); true yapılacak.

  allData: [],//şu anda tüm listelerin verileri
  dataRegister: [],//kullanıcı bilgileri

  localhost: "http://cf9d91e3f607.ngrok.io",
  hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  minutes: [0,1,2,3,4,5,6,7,8,9,10,11,12, 13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
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

  uname: "",
  pass: "",
};
