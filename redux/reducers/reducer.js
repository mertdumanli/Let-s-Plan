import { setText0, setText1, setPicture, setPictureBoolean, setMaxDay, setMaxLesson, setShownBoolean, 
  setStatus, setAllData, setLogin, setDataRegister, setUname, setPass } from "../actions";

import { initialState } from "../initialStates";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case setText0:
      return { ...state, text0: action.payload };
    case setText1:
      return { ...state, text1: action.payload };
    case setPicture:
      return { ...state, picture: action.payload };
    case setPictureBoolean:
      return { ...state, pictureBoolean: action.payload };
    case setMaxDay:
      return { ...state, maxDay: action.payload };
    case setMaxLesson:
      return { ...state, maxLesson: action.payload };
    case setShownBoolean:
      return { ...state, shownBoolean: action.payload };
    case setStatus:
      return { ...state, status: action.payload };
    case setAllData:
      return {
        ...state,
        //allData: state.allData.concat(action.payload),// sonuna ekleme yapmaya çevirmek istersem
        allData: action.payload, //direkt dizi eşitliyor
      };
    case setLogin:
      return { ...state, login: action.payload };
    case setDataRegister:
      return { ...state, dataRegister: action.payload };

    case setUname:
      return { ...state, uname: action.payload };

    case setPass:
      return { ...state, pass: action.payload };

    default:
      return state;
  }
}
