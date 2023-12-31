import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { Modal } from "@mui/material";

import { useUserContext } from "../Context/userContext";
import { useAuthContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostContext";

export const PostCard = ({ post }) => {
  const [prevPostDetails, setPrevPostDetails] = useState(post);
  const [editDeleteBtn, setEditDeleteBtn] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const { usersState, addPostToBookmarks, removePostFromBookmarks } =
    useUserContext();
  const { likePost, dislikePost, postState, deletePost, editPost } =
    usePostContext();
  const { userInfo } = useAuthContext();

  const findUser = usersState?.allUsers?.find(
    (user) => user?.username === post?.username
  );

  const navigate = useNavigate();

  const openEditPostModal = () => setEditPostModal(true);
  const closeEditPostModal = () => setEditPostModal(false);
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

  const submitHandler = (e) => {
    e.preventDefault();
    editPost(prevPostDetails?._id, prevPostDetails);
    closeEditPostModal();
  };

  const handleShare = async (id) => {
    try {
      await navigator.share({
        title: "Funk Feed",
        text: "Check out this post",
        url: `https://funkfeed.netlify.app/post/${id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <article className="w-[40rem] flex flex-col justify-center bg-white-color rounded-[0.5rem]  gap-4  m-auto p-4 relative xl:w-[35rem]  smaller-mobile dark:bg-dark-primary ">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src={findUser?.profileImg}
            alt=""
            className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer "
            onClick={() => navigate(`/userProfile/${findUser?.username}`)}
          />
          <div>
            <p className="font-medium dark:text-white-color">
              @{findUser?.username}
            </p>
            <p className="dark:text-white-color">{` ${new Date(post?.createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}`}</p>
          </div>
        </div>
        {post?.username === userInfo?.username && (
          <div
            className="cursor-pointer dark:text-white-color"
            title="edit | delete"
            onClick={() => setEditDeleteBtn(!editDeleteBtn)}
          >
            <MoreVertIcon />
          </div>
        )}

        {editDeleteBtn && (
          <div className="  flex flex-col gap-2 justify-center  rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute left-[80%] top-[5%] bg-white-color dark:bg-dark-secondary">
            <div
              className="flex justify-between hover:bg-light-primary-color rounded-t-[0.5rem]  px-2 py-1 dark:text-white-color dark:hover:text-black-color"
              onClick={() => {
                openEditPostModal();
                setEditDeleteBtn(false);
              }}
            >
              <button>Edit</button>
              <EditIcon />
            </div>
            <div
              className="flex justify-between gap-1  hover:bg-light-primary-color rounded-b-[0.5rem] px-2 py-1 dark:text-white-color dark:hover:text-black-color"
              onClick={(e) => {
                deletePost(post?._id);
                setEditDeleteBtn(false);
              }}
            >
              <button>Delete</button>
              <DeleteIcon />
            </div>
          </div>
        )}
      </div>
      <p className="dark:text-white-color">{post?.content}</p>
      <div>
        <img
          src={post?.mediaURL}
          alt={post?.mediaAlt}
          className=" object-cover mx-auto w-full max-h-[35rem]"
        />
      </div>

      <div className="flex gap-4 items-center">
        <p className="dark:text-white-color">{post?.likes?.likeCount} Likes</p>
        <p className="dark:text-white-color">
          {post?.comments?.length} Comments
        </p>
      </div>
      <hr />
      <div className="flex gap-12 items-center  dark:text-white-color">
        {post?.likes?.likedBy?.find(
          (item) => item?.username === userInfo?.username
        ) ? (
          <div
            title="dislike post"
            className="  cursor-pointer dark:text-white-color"
            onClick={() => dislikePost(post?._id)}
          >
            <FavoriteOutlinedIcon />
          </div>
        ) : (
          <div
            title="like post"
            className="  cursor-pointer"
            onClick={() => likePost(post?._id)}
          >
            <FavoriteBorderOutlinedIcon />
          </div>
        )}
        <div
          title="comment"
          className="cursor-pointer  dark:text-white-color"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <ModeCommentOutlinedIcon />
        </div>
        {userInfo?.bookmarks?.some((item) => item?._id?.includes(post?._id)) ? (
          <div
            title="remove from bookmark"
            className="cursor-pointer "
            onClick={() => removePostFromBookmarks(post?._id)}
          >
            <BookmarkOutlinedIcon />
          </div>
        ) : (
          <div
            className="cursor-pointer "
            title="bookmark"
            onClick={() => addPostToBookmarks(post?._id)}
          >
            <BookmarkBorderOutlinedIcon />
          </div>
        )}
        <div
          className="cursor-pointer  dark:text-white-color"
          title="share"
          onClick={() => handleShare(post?._id)}
        >
          <ShareIcon />
        </div>
      </div>
      <hr />

      <Modal
        open={editPostModal}
        onClose={closeEditPostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <form
            className="bg-white-color p-4 rounded-[0.5rem] flex flex-col justify-between gap-4 min-h-[15rem] min-w-[25rem] outline-none border-none dark:bg-dark-secondary"
            onSubmit={(e) => submitHandler(e)}
          >
            <textarea
              className="p-2 border-none outline-none rounded-[0.5rem] dark:bg-dark-primary dark:text-white-color"
              rows={6}
              value={prevPostDetails?.content}
              onChange={(e) =>
                setPrevPostDetails({
                  ...prevPostDetails,
                  content: e.target.value,
                })
              }
            ></textarea>
            {prevPostDetails?.mediaURL?.length > 0 && (
              <div className="relative">
                <img
                  src={prevPostDetails?.mediaURL}
                  className="mx-auto max-h-[10rem]"
                />
                <div
                  className="absolute left-[90%] bottom-[90%] dark:text-white-color"
                  onClick={() =>
                    setPrevPostDetails({
                      ...prevPostDetails,
                      mediaURL: null,
                      mediaAlt: null,
                    })
                  }
                >
                  <CancelOutlinedIcon />
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label
                    className="cursor-pointer dark:text-white-color"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    {showEmoji && (
                      <div className="absolute right-[28rem] bottom-[1px]">
                        {" "}
                        <Picker
                          data={data}
                          maxFrequentRows={0}
                          previewPosition="none"
                          emojiButtonSize={28}
                          emojiSize={20}
                          onEmojiSelect={(emoji) => {
                            setPrevPostDetails({
                              ...prevPostDetails,
                              content: prevPostDetails.content + emoji.native,
                            });
                          }}
                        />{" "}
                      </div>
                    )}
                    <EmojiEmotionsOutlinedIcon />
                  </label>
                  <label className="cursor-pointer dark:text-white-color">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setNewImage(e.target.files[0]);
                        setPrevPostDetails({
                          ...prevPostDetails,
                          mediaURL: URL.createObjectURL(e.target.files[0]),
                        });
                      }}
                    />
                    <AddPhotoAlternateOutlinedIcon />
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                    onClick={() => {
                      closeEditPostModal();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </article>
  );
};
