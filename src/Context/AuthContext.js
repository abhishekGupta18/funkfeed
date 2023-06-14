import { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authReducer } from "../Reducer/AuthReducer";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const localStorageItem = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  const [authState, authDispatch] = useReducer(authReducer, {
    userInfo: {},
    token: localStorageItem?.token || null,
  });

  const userSignUp = async (signUpData) => {
    try {
      const { data, status } = await axios({
        method: "post",
        url: "/api/auth/signup",
        data: signUpData,
      });
      if (status === 201) {
        authDispatch({ type: "user_info", payload: data.createdUser });
        authDispatch({ typee: "user_token", payload: data.encodedToken });
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
        );
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userLogin = async (loginData) => {
    try {
      const { data, status } = await axios({
        method: "post",
        url: "/api/auth/login",
        data: loginData,
      });
      if (status === 200) {
        authDispatch({ type: "user_info", payload: data.foundUser });
        authDispatch({ typee: "user_token", payload: data.encodedToken });
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
        );
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (localStorageItem) {
      authDispatch({ type: "user_info", payload: localStorageItem?.user });
      authDispatch({ type: "user_token", payload: localStorageItem?.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userSignUp, userLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
