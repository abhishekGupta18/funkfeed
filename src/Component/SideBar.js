import { NavLink } from "react-router-dom";
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

  const getstyles = ({ isActive }) => ({
    color: isActive ? "black" : null,
    backgroundColor: isActive ? "#dbeafe" : null,
  });

  return (
    <div className=" w-[18rem] py-4  flex flex-col gap-5 bg-white-color mx-auto items-center rounded-[0.5rem] mobile-view  xl:w-[15rem] sm:bg-white-color sm:h-[3rem] sm:flex-row sm:justify-around sm:mx-0 sm:rounded-0 sm:fixed sm:bottom-0 sm:z-30 dark:bg-dark-primary">
      {" "}
      <NavLink
        style={getstyles}
        to="/"
        className="flex justify-center gap-[1rem] cursor-pointer  py-2  w-[80%]  shadow-md rounded-[0.5rem] hover:bg-light-primary-color dark:border dark:border-white-color dark:border-solid dark:text-white-color dark:hover:text-black-color"
      >
        <HomeIcon />
        <p className="font-bold md:hidden">Feed</p>
      </NavLink>
      <NavLink
        style={getstyles}
        to="/explore"
        className="flex gap-[1rem] justify-center cursor-pointer py-2 pl-4 w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color dark:border dark:border-white-color dark:border-solid dark:text-white-color dark:hover:text-black-color sm:pl-0"
      >
        <ExploreIcon />
        <p className="font-bold md:hidden">Explore</p>
      </NavLink>
      <NavLink
        to="/bookmarks"
        style={getstyles}
        className="flex gap-[1rem] justify-center cursor-pointer pl-12  py-2 w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color md:pl-0 dark:border dark:border-white-color dark:border-solid dark:text-white-color dark:hover:text-black-color"
      >
        <BookmarksIcon />
        <p className="font-bold md:hidden">Bookmarks</p>
      </NavLink>
      <NavLink
        to={`/userProfile/${userInfo?.username}`}
        style={getstyles}
        className="flex gap-[1rem] justify-center cursor-pointer py-2 pl-4 w-[80%] shadow-md
       rounded-[0.5rem] hover:bg-light-primary-color dark:border dark:border-white-color dark:border-solid dark:text-white-color dark:hover:text-black-color sm:pl-0"
      >
        <ManageAccountsIcon />
        <p className="font-bold md:hidden">Profile</p>
      </NavLink>
      <div
        title="add post"
        className=" mb-[5rem] mt-[2rem] cursor-pointer addPost sm:mb-0 sm:mt-0 sm:py-1 sm:w-[80%] sm:shadow-md rounded-[0.5rem] sm:hover:bg-light-primary-color sm:flex sm:justify-center  dark:text-white-color sm:dark:border sm:dark:border-sold sm:dark:border-white-color"
        onClick={() => openNewPostModal()}
      >
        <AddCircleOutlineIcon />
      </div>
      <button
        className="w-[90%]  rounded-[0.5rem] font-bold py-2  text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:hidden"
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
            className="bg-white-color p-4 rounded-[0.5rem] flex flex-col justify-between gap-4 min-h-[15rem] w-[25rem] dark:bg-dark-secondary"
          >
            <textarea
              type="text"
              rows={4}
              placeholder="What is happening?!"
              className="p-2 border-none outline-none rounded-[0.5rem] dark:bg-dark-primary dark:text-white-color"
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
                <label
                  className="cursor-pointer dark:text-white-color"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
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
                <label className="cursor-pointer dark:text-white-color">
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
                  className="border-solid border-primary-color border px-2 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
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
                  disabled={
                    newPostDetails?.content === "" &&
                    newPostDetails?.mediaURL === ""
                  }
                  type="submit"
                  className="  disabled:cursor-not-allowed border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
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
