import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import Loader from "../../Component/Loader";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import { PostCard } from "../../Component/PostContainer";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
import { useCommentContext } from "../../Context/CommentsContext";
import { useAuthContext } from "../../Context/AuthContext";
export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [editCommentModal, setEditCommentModal] = useState(false);
  const [editCommentValue, setEditCommentValue] = useState("");

  const { userInfo } = useAuthContext();
  const { usersState, filteredUsers } = useUserContext();
  const { postState } = usePostContext();
  const { addComment, deleteComment, editComment } = useCommentContext();
  const { postId } = useParams();

  const getPostDetails = async () => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `/api/posts/${postId}`,
      });
      if (status === 200) {
        setPostDetails(data?.post);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [postState?.allPost]);

  const openEditCommentModal = () => setEditCommentModal(true);
  const closeEditCommentModal = () => setEditCommentModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        {postDetails ? (
          <div className="  flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[86vh] post-scroll no-scroll sm:mb-8">
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
              <ul className="flex flex-col gap-2 sm:mb-8">
                {postDetails?.comments?.map((comment) => {
                  const userComment = usersState?.allUsers?.find(
                    (user) => user?.username === comment?.username
                  );
                  return (
                    <div className="flex flex-col gap-2 w-full px-4 py-2 rounded-[0.5rem] border-none outline-none  bg-white-color dark:bg-dark-primary xl:w-[35rem]  smaller-mobile">
                      <div className="flex items-center justify-between">
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
                        {comment?.username === userInfo?.username && (
                          <div className="flex items-center gap-4">
                            <label
                              title="edit comment"
                              className="cursor-pointer dark:text-white-color"
                              onClick={() => {
                                openEditCommentModal();
                                setEditCommentValue(comment?.text);
                              }}
                            >
                              <ModeEditOutlineIcon />
                            </label>
                            <label
                              title="delete comment"
                              className="cursor-pointer dark:text-white-color"
                              onClick={() =>
                                deleteComment(postDetails?._id, comment?._id)
                              }
                            >
                              <DeleteIcon />
                            </label>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium ml-4 dark:text-white-color">
                          {comment?.text}
                        </p>
                      </div>
                      <Modal
                        open={editCommentModal}
                        onClose={closeEditCommentModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div style={{ ...style }}>
                          <div className="bg-white-color p-4 rounded-[0.5rem] flex flex-col justify-between gap-4  outline-none border-none dark:bg-dark-secondary">
                            <input
                              type="text"
                              value={editCommentValue}
                              onChange={(e) =>
                                setEditCommentValue(e.target.value)
                              }
                              className="p-2 border-none outline-none rounded-[0.5rem] dark:bg-dark-primary dark:text-white-color"
                            />
                            <div className="flex items-center gap-4">
                              <button
                                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                                onClick={() => closeEditCommentModal()}
                              >
                                Cancel
                              </button>
                              <button
                                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                                onClick={() => {
                                  editComment(
                                    postDetails?._id,
                                    comment?._id,
                                    editCommentValue
                                  );
                                  closeEditCommentModal();
                                }}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-[40px] h-[40px]">
            <Loader />
          </div>
        )}
        <div className="bg-white-color p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:hidden dark:bg-dark-primary ">
          <strong>
            <p className="dark:text-white-color">Users you might know</p>
          </strong>
          <ul className="flex flex-col gap-4">
            {filteredUsers.map((users) => (
              <SuggestedUserCard key={users?._id} user={users} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
