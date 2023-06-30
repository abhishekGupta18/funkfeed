import axios from "axios";
import { useContext, createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "./AuthContext";
import { usersReducer } from "../Reducer/usersReducer";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, {
    allUsers: [],
    user: {},
  });
  const { token, userInfo, setUserInfo } = useAuthContext();

  const avatars = [
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

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

  const editUserProfile = async (prevProfileDetails) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: "/api/users/edit",
        data: { userData: prevProfileDetails },
        headers: { authorization: token },
      });
      if (status === 201) {
        usersDispatch({ type: "update_user_detail", payload: data?.user });
        setUserInfo(data?.user);
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
        toast.success(
          `Started following ${data?.followUser?.firstName} ${data?.followUser?.lastName} `
        );
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
        toast.info(
          `Unfollowed ${data?.followUser?.firstName} ${data?.followUser?.lastName} `
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getAllBookmarks = async () => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: "/api/users/bookmark",
        headers: { authorization: token },
      });
      if (status === 200) {
        usersDispatch({ type: "get_all_bookmarks", payload: data?.bookmarks });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addPostToBookmarks = async (postId) => {
    try {
      const { data, status } = await axios({
        method: "post",
        url: `/api/users/bookmark/${postId}`,
        headers: { authorization: token },
      });
      if (status === 200) {
        usersDispatch({ type: "get_all_bookmarks", payload: data?.bookmarks });
        setUserInfo({ ...userInfo, bookmarks: data?.bookmarks });
        toast.success("Post added to bookmarks");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removePostFromBookmarks = async (postId) => {
    try {
      const { data, status } = await axios({
        method: "post",
        url: `/api/users/remove-bookmark/${postId}`,
        headers: { authorization: token },
      });
      if (status === 200) {
        usersDispatch({ type: "get_all_bookmarks", payload: data?.bookmarks });
        setUserInfo({ ...userInfo, bookmarks: data?.bookmarks });
        toast.warning("Post removed from bookmarks");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllBookmarks();
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
      value={{
        usersState,
        followUsers,
        unFollowUsers,
        filteredUsers,
        addPostToBookmarks,
        removePostFromBookmarks,
        editUserProfile,
        avatars,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
