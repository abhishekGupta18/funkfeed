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
  console.log(postState?.allPost);
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

  const likePost = async (postId) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/posts/like/${postId}`,
        headers: { authorization: token },
      });

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

      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deletePost = async (postId) => {
    try {
      const { status, data } = await axios({
        method: "delete",
        url: `/api/posts/${postId}`,
        headers: { authorization: token },
      });
      console.log(data);
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addNewPost = async (postDetails) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: "/api/posts",
        data: { postData: postDetails },
        headers: { authorization: token },
      });
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editPost = async (postId, prevPostDetails) => {
    try {
      const { status, data } = await axios({
        method: "post",
        url: `/api/posts/edit/${postId}`,
        data: { postData: prevPostDetails },
        headers: { authorization: token },
      });
      console.log(status);
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
  }, [token]);

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
        deletePost,
        addNewPost,
        editPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
