import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import { PostCard } from "../../Component/PostContainer";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
import { useCommentContext } from "../../Context/CommentsContext";
import { useEffect } from "react";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [commentInput, setCommentInput] = useState("");

  const { filteredUsers } = useUserContext();
  const { postState } = usePostContext();
  const { addComment } = useCommentContext();
  const { postId } = useParams();

  const getPostDetails = async () => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `/api/posts/${postId}`,
      });
      if (status === 200 || status === 201) {
        setPostDetails(data?.post);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [postState?.allPost]);

  return (
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        <div className="  flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll ">
          <div>
            <PostCard post={postDetails} />
          </div>
          <div className="flex gap-4 items-center w-[40rem]">
            <input
              value={commentInput}
              type="text"
              placeholder="add comment"
              className="w-full px-4 py-2 rounded-[0.5rem] border-none outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              className="border-solid border-primary-color border bg-white px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white "
              onClick={() => {
                addComment(postDetails?._id, commentInput);
                setCommentInput("");
              }}
            >
              Comment
            </button>
          </div>
          <div>
            <ul>
              {postDetails?.comments?.map((item) => (
                <li>
                  <div>
                    <p>{item?.username}</p>
                    <p>{item?.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:hidden dark:bg-dark-primary ">
          <strong>
            <p className="dark:text-white-color">Users you might know</p>
          </strong>
          <ul className="flex flex-col gap-4">
            {filteredUsers.map((users) => (
              <SuggestedUserCard user={users} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
