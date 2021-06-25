import { setText0, setText1, setPicture, setPictureBoolean, setMaxDay, setMaxLesson, setShownBoolean, setStatus,
  setLogin, setUname, setPass, setDataRegister, setDataRegisterLast, setDataStreaming, setDataStreamingLast,
  setDataLesson, setDataLessonLast } from "../actions";

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
    case setLogin:
      return { ...state, login: action.payload };
    case setDataRegister:
      return { ...state, dataRegister: action.payload };
    case setDataRegisterLast:
      return {
        ...state,
        dataRegister: state.dataRegister.concat(action.payload),
      };
    case setDataStreaming:
      return { ...state, dataStreaming: action.payload };
    case setDataStreamingLast:
      return {
        ...state,
        dataStreaming: state.dataStreaming.concat(action.payload),
      };
    case setDataLesson:
      return { ...state, dataLesson: action.payload };
    case setDataLessonLast:
      return {
        ...state,
        dataLesson: state.dataLesson.concat(action.payload),
      };
    case setUname:
      return { ...state, uname: action.payload };
    case setPass:
      return { ...state, pass: action.payload };
    default:
      return state;
  }
}
