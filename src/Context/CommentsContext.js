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

  return (
    <CommentContext.Provider value={{ addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
