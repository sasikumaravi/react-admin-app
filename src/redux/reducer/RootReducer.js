import { FETCH_DATA, LOGOUT_DATA } from "../actionStore/ActionStore";

const initialState = {
  authToken: "",
  isLoggedOut:false,
  isLoggedIn:false,
}
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, authToken: action.payload,isLoggedIn:true, isLoggedOut:false,};
    case LOGOUT_DATA:
      return { ...state, isLoggedOut:true,authToken: action.payload ,isLoggedIn:false,};
    default:
      return state;
  }
}   