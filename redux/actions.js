export const setText0 = "SET_TEXT0";

export const setText1 = "SET_TEXT1";

export const setPicture = "SET_PICTURE";

export const setPictureBoolean = "SET_PICTUREBOOLEAN";

export const setMaxDay = "SET_MAXDAY";

export const setMaxLesson = "SET_MAXLESSON";

export const setShownBoolean = "SET_SHOWNBOOLEAN";

export const setStatus = "SET_STATUS";

export const setAllData = "SET_ALL_DATA";

export const setLogin = "SET_LOGIN";

export const setDataRegister =  "SET_DATA_REGISTER";

export const setUname = "SET_UNAME";

export const setPass = "SET_PASS";

export const set_Text0 = (text0) => {
  return {
    type: setText0,
    payload: { text0 },
  };
};

export const set_Uname = (uname) => {
  return {
    type: setUname,
    payload: { uname },
  };
};

export const set_Pass = (pass) => {
  return {
    type: setPass,
    payload: { pass },
  };
};

export const set_DataRegister = (dataRegister) => {
  return {
    type: setDataRegister,
    payload: { dataRegister },
  };
};

export const set_Login = (login) => {
  return {
    type: setLogin,
    payload: { login },
  };
};

export const set_AllData = (allData) => {
  return {
    type: setAllData,
    payload: { allData },
  };
};

export const set_Status = (status) => {
  return {
    type: setStatus,
    payload: { status },
  };
};

export const set_Text1 = (text1) => {
  return {
    type: setText1,
    payload: { text1 },
  };
};

export const set_Picture = (picture) => {
  return {
    type: setPicture,
    payload: { picture },
  };
};

export const set_MaxDay = (maxDay) => {
  return {
    type: setMaxDay,
    payload: { maxDay },
  };
};

export const set_MaxLesson = (maxLesson) => {
  return {
    type: setMaxLesson,
    payload: { maxLesson },
  };
};

export const set_PictureBoolean = (pictureBoolean) => {
  return {
    type: setPictureBoolean,
    payload: { pictureBoolean },
  };
};

export const set_ShownBoolean = (shownBoolean) => {
  return {
    type: setShownBoolean,
    payload: { shownBoolean },
  };
};
