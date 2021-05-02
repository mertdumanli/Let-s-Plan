const initialState = {
  payload: [
    {
      sizeNo: 1,
      dayNo: 5,
      dayControl: false,
    },
  ],
};
export const reducerLesson = (state = initialState, action) => {
  switch (action.type) {
    case "GetValues":
      return {
        ...state,
        payload: [...state.payload, action.payload]
      };
  }
};
