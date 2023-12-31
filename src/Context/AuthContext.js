import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const localStorageItem = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(localStorageItem?.user);
  const [token, setToken] = useState(localStorageItem?.token || null);

  const userSignUp = async (signUpData) => {
    try {
      const { data, status } = await axios({
        method: "post",
        url: "/api/auth/signup",
        data: signUpData,
      });
      if (status === 201) {
        setToken(data?.encodedToken);
        setUserInfo(data?.createdUser);
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
        );
        toast.success(
          `Welcome  ${data?.createdUser?.firstName} ${data?.createdUser?.lastName}`
        );

        navigate("/");
      }
    } catch (e) {
      console.error(e);
      toast.error("Write new username");
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
        setToken(data?.encodedToken);
        setUserInfo(data?.foundUser);
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.foundUser, token: data?.encodedToken })
        );
        toast.success(
          `Welcome Back ${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`
        );
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userLogout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem("data");
    navigate("/login");
    toast.info("Succesfully logout");
  };

  return (
    <AuthContext.Provider
      value={{
        setUserInfo,
        userInfo,
        token,
        userSignUp,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
