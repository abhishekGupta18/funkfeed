import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { useAuthContext } from "./AuthContext";
import { postReducer } from "../Reducer/postReducer";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [addPostModal, setAddPostModal] = useState(false);
  const { token } = useAuthContext();
  const [postState, postDispatch] = useReducer(postReducer, {
    allPost: [],
    userPost: [],
  });
  const [openPostModal, setOpenPostModal] = useState(false);
  const openNewPostModal = () => setOpenPostModal(true);
  const closeNewPostModal = () => setOpenPostModal(false);

  const getAllPost = async () => {
    try {
      const { status, data } = await axios({
        method: "get",
        url: "/api/posts",
      });
      if (status === 200) {
        postDispatch({ type: "get_all_post", payload: data?.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserPost = async (username) => {
    try {
      const { status, data } = await axios({
        method: "get",
        url: `/api/posts/user/${username}`,
      });
      if (status === 200) {
        postDispatch({ type: "get_user_post", payload: data?.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      getAllPost();
    }
  });

  return (
    <PostContext.Provider
      value={{
        postState,
        getUserPost,
        addPostModal,
        setAddPostModal,
        openNewPostModal,
        closeNewPostModal,
        openPostModal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
