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
  console.log(postState?.allPost);
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

  const likePost = async (postId) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/posts/like/${postId}`,
        headers: { authorization: token },
      });
      console.log(data, status);
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/posts/dislike/${postId}`,
        headers: { authorization: token },
      });
      console.log(data, status);
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
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
        likePost,
        dislikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
