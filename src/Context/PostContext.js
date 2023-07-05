import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  const [postLoading, setPostLoading] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [trending, setTrending] = useState(false);
  const [latest, setLatest] = useState(false);
  const { token } = useAuthContext();
  const [postState, postDispatch] = useReducer(postReducer, {
    allPost: [],
    userPost: [],
  });

  const [openPostModal, setOpenPostModal] = useState(false);
  const openNewPostModal = () => setOpenPostModal(true);
  const closeNewPostModal = () => setOpenPostModal(false);
  const navigate = useNavigate();
  const getAllPost = async () => {
    try {
      setPostLoading(true);
      const { status, data } = await axios({
        method: "get",
        url: "/api/posts",
      });
      if (status === 200) {
        postDispatch({ type: "get_all_post", payload: data?.posts });
        setPostLoading(false);
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
        toast.success("you liked a post");
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
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data.posts });
        toast.info("Post deleted");
        navigate("/");
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
        toast.success("New post added");
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
        toast.success("Post has been edited");
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
        postLoading,
        postDispatch,
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
        trending,
        setTrending,
        latest,
        setLatest,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
