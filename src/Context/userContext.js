import axios from "axios";
import { useContext, createContext, useReducer, useEffect } from "react";

import { usersReducer } from "../Reducer/usersReducer";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, []);

  const getAllUsers = async () => {
    try {
      const { status, data } = await axios({
        method: "get",
        url: "/api/users",
      });
      if (status === 200) {
        usersDispatch({ type: "get_users", payload: data?.users });
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <UserContext.Provider value={{ usersState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
