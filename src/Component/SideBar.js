import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Modal } from "@mui/material";
import { useAuthContext } from "../Context/AuthContext";

import { usePostContext } from "../Context/PostContext";
import { useState } from "react";
export const SideBar = () => {
  const [newPostDetails, setNewPostDetails] = useState({
    content: "",
    mediaURL: "",
  });
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const { userLogout, userInfo } = useAuthContext();
  const { openNewPostModal, closeNewPostModal, openPostModal, addNewPost } =
    usePostContext();
  const navigate = useNavigate();
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

  const addPostHandler = (e) => {
    e.preventDefault();
    addNewPost(newPostDetails);
    closeNewPostModal();
    setNewPostDetails({ ...newPostDetails, content: "", mediaURL: "" });
    setImage(null);
  };

  return (
    <div className=" w-[18rem] py-4  flex flex-col gap-5  mx-auto items-center ">
      <div
        className="flex justify-center gap-[1rem] cursor-pointer  py-2  w-[80%]  shadow-md rounded-[0.5rem] hover:bg-light-primary-color "
        onClick={() => navigate("/")}
      >
        <HomeIcon />
        <p className="font-bold">Feed</p>
      </div>

      <div
        className="flex gap-[1rem] justify-center cursor-pointer py-2  w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color "
        onClick={() => navigate("/explore")}
      >
        <ExploreIcon />
        <p className="font-bold">Explore</p>
      </div>
      <div
        className="flex gap-[1rem] justify-center cursor-pointer pl-5  py-2 w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color "
        onClick={() => navigate("/bookmarks")}
      >
        <BookmarksIcon />
        <p className="font-bold">Bookmarks</p>
      </div>
      <div
        className="flex gap-[1rem] justify-center cursor-pointer py-2 w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color"
        onClick={() => navigate(`/userProfile/${userInfo?.username}`)}
      >
        <ManageAccountsIcon />
        <p className="font-bold">Profile</p>
      </div>
      <div
        title="add post"
        className=" mb-[5rem] mt-[2rem] cursor-pointer addPost "
        onClick={() => openNewPostModal()}
      >
        <AddCircleOutlineIcon />
      </div>
      <button
        className="w-[90%]  rounded-[0.5rem] font-bold py-2  text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
        onClick={() => userLogout()}
      >
        Logout
      </button>

      <Modal
        open={openPostModal}
        onClose={closeNewPostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <form
            onSubmit={(e) => {
              addPostHandler(e);
            }}
            className="bg-white p-4 rounded-[0.5rem] flex flex-col justify-between gap-4 min-h-[15rem] w-[25rem] "
          >
            <textarea
              type="text"
              rows={4}
              placeholder="What is happening?!"
              className="p-2 border-none outline-none"
              value={newPostDetails?.content}
              onChange={(e) => {
                setNewPostDetails({
                  ...newPostDetails,
                  content: e.target.value,
                });
              }}
            ></textarea>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="mx-auto max-h-[10rem]"
              />
            )}
            <div className="flex justify-between items-center">
              <div className="flex gap-4  items-center ">
                <label onClick={() => setShowEmoji(!showEmoji)}>
                  <EmojiEmotionsOutlinedIcon />
                </label>
                {showEmoji && (
                  <div
                    className="absolute right-[28rem] bottom-[1px]"
                    onClick={() => setShowEmoji(true)}
                  >
                    {" "}
                    <Picker
                      data={data}
                      maxFrequentRows={0}
                      previewPosition="none"
                      emojiButtonSize={28}
                      emojiSize={20}
                      onEmojiSelect={(emoji) => {
                        setNewPostDetails({
                          ...newPostDetails,
                          content: newPostDetails.content + emoji.native,
                        });
                      }}
                    />{" "}
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    value={newPostDetails?.media}
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setNewPostDetails({
                        ...newPostDetails,
                        mediaURL: URL.createObjectURL(e.target.files[0]),
                        // converting image to url
                      });
                    }}
                  />
                  <AddPhotoAlternateOutlinedIcon />
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  className="border-solid border-primary-color border px-2 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white"
                  onClick={() => {
                    closeNewPostModal();
                    setNewPostDetails({
                      ...newPostDetails,
                      content: "",
                      mediaURL: "",
                    });
                    setImage(null);
                    setShowEmoji(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white "
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
