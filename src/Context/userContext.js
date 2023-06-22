import axios from "axios";
import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import { useAuthContext } from "./AuthContext";
import { usersReducer } from "../Reducer/usersReducer";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, {
    allUsers: [],
    user: {},
  });
  const { token, userInfo, setUserInfo } = useAuthContext();

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

  const followUsers = async (userId) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/users/follow/${userId}`,
        headers: { authorization: token },
      });

      if (status === 200) {
        usersDispatch({ type: "follow_user", payload: data?.user });
        setUserInfo(data?.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const unFollowUsers = async (userId) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/users/unfollow/${userId}`,
        headers: { authorization: token },
      });

      if (status === 200) {
        usersDispatch({ type: "unfollow_user", payload: data?.user });
        setUserInfo(data?.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = usersState?.allUsers
    ?.filter((dbUser) => dbUser.username !== userInfo?.username)
    ?.filter(
      (eachUser) =>
        !userInfo?.following?.find(
          (item) => item.username === eachUser.username
        )
    );

  return (
    <UserContext.Provider
      value={{ usersState, followUsers, unFollowUsers, filteredUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
