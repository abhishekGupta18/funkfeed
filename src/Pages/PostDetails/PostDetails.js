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

  const { usersState, filteredUsers } = useUserContext();
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
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        <div className="  flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll sm:mb-8">
          <div>
            <PostCard post={postDetails} />
          </div>
          <div className="flex gap-4 items-center w-[40rem] xl:w-[35rem]  smaller-mobile">
            <input
              value={commentInput}
              type="text"
              placeholder="add comment"
              className="w-full px-4 py-2 rounded-[0.5rem] border-none outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              className=" rounded-[0.5rem] font-bold px-4 py-2 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color "
              onClick={() => {
                addComment(postDetails?._id, commentInput);
                setCommentInput("");
              }}
            >
              Comment
            </button>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              {postDetails?.comments?.map((comment) => {
                const userComment = usersState?.allUsers?.find(
                  (user) => user?.username === comment?.username
                );
                return (
                  <div className="flex flex-col gap-2 w-full px-4 py-2 rounded-[0.5rem] border-none outline-none  bg-white-color dark:bg-dark-primary xl:w-[35rem]  smaller-mobile">
                    <div className="flex items-center gap-4">
                      <img
                        src={userComment?.profileImg}
                        alt=""
                        className="rounded-[50%] w-[35px] h-[35px] object-cover cursor-pointer"
                      />
                      <div>
                        <strong className="dark:text-white-color">
                          {" "}
                          <p>@{comment?.username}</p>
                        </strong>
                        <p className="text-sm dark:text-white-color">
                          {" "}
                          {` ${new Date(comment?.createdAt)
                            .toDateString()
                            .split(" ")
                            .slice(1, 4)
                            .join(" ")}`}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium ml-4 dark:text-white-color">
                        {comment?.text}
                      </p>
                    </div>
                  </div>
                );
              })}
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
