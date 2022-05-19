import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Initial user state
const initialState = {
  // user: null,
  user: {
    _id:"62831c634b3ff455b7cf9293",
    username:"shuya",
    email:"shuya@gmail.com",
    password:"123456",
    profilePicture:"/person/1.jpeg",
    coverPicture:"",
    followers:[],
    followings:[],
    isAdmin: false
  },
  isFetching: false,
  error: false,
};

// management global
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return(
    <AuthContext.Provider 
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};