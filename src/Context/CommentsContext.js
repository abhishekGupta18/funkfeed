import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "./AuthContext";
import { usePostContext } from "./PostContext";

export const CommentContext = createContext();
export const CommentContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const { postDispatch } = usePostContext();

  const addComment = async (postId, commentData) => {
    try {
      const { data, status } = await axios({
        url: `/api/comments/add/${postId}`,
        method: "post",
        data: { commentData },
        headers: { authorization: token },
      });
      console.log(data);
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data?.posts });
        toast.success("comment successfully added");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/comments/delete/${postId}/${commentId}`,
        headers: { authorization: token },
      });
      console.log(status);
      if (status === 201) {
        postDispatch({ type: "get_all_post", payload: data?.posts });
        toast.info("Comment removed!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editComment = async (postId, commentId, commentData) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/edit/${postId}/${commentId}`,
        { commentData },
        { headers: { authorization: token } }
      );
      if (status === 201 || status === 200) {
        postDispatch({ type: "get_all_post", payload: data?.posts });
        toast.success("Comment edited!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CommentContext.Provider value={{ addComment, deleteComment, editComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
