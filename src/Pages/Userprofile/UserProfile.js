import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import Loader from "../../Component/Loader";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";

export const UserProfile = () => {
  const [editProfileModal, setUserProfileModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState("");
  const { userLogout, userInfo } = useAuthContext();
  const {
    filteredUsers,
    followUsers,
    unFollowUsers,
    editUserProfile,
    avatars,
    userLoading,
    usersState,
  } = useUserContext();
  const { postState, getUserPost, postLoading } = usePostContext();
  const { username } = useParams();

  const openEditProfileModal = () => setUserProfileModal(true);
  const closeEditProfileModal = () => setUserProfileModal(false);

  const openAvatarModal = () => setAvatarModal(true);
  const closeAvatareModal = () => setAvatarModal(false);

  const getUserData = async () => {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `/api/users/${username}`,
      });

      if (status === 200) {
        setUserData(data?.user);
        getUserPost(username);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, [username, usersState]);

  const currentUserPost = postState?.allPost?.filter(
    (item) => item?.username === username
  );

  const editProfileHandler = (e) => {
    e.preventDefault();
    editUserProfile(userData);
    closeEditProfileModal();
  };
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
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white-color h-max shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-[0.5rem] ">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[86vh]   xl:w-[35rem]  smaller-mobile sm:mb-8">
          <div className="bg-white-color rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[40rem] dark:bg-dark-primary xl:w-[35rem]  smaller-mobile ">
            <div className="  flex justify-between p-4 items-center">
              <div className="flex items-center gap-4">
                <img
                  title="user profile"
                  src={userData?.profileImg}
                  alt="user-profile"
                  className="rounded-[50%] w-[60px] h-[60px] object-cover"
                />
                <div>
                  <strong>
                    <p className="dark:text-white-color">
                      {userData?.firstName} {userData?.lastName}
                    </p>
                  </strong>
                  <p className="dark:text-white-color">@{userData?.username}</p>
                </div>
              </div>
              {userInfo?.username === userData?.username ? (
                <div className="flex  items-center gap-4 mr-4 sm:gap-2 sm:mr-0">
                  <button
                    title="edit profile"
                    className=" rounded-[0.5rem] font-bold px-2 py-1 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
                    onClick={() => {
                      openEditProfileModal();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    title="logout"
                    className=" rounded-[0.5rem] font-bold px-2 py-1 text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
                    onClick={() => userLogout()}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className=" mr-4">
                  {userInfo?.following
                    ?.map((user) => user.username)
                    .includes(userData?.username) ? (
                    <button
                      className="  rounded-[0.5rem] font-bold px-4 py-1 text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                      onClick={() => unFollowUsers(userData._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="  rounded-[0.5rem] font-bold px-4 py-1 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                      onClick={() => followUsers(userData._id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className=" flex flex-col gap-2 p-4 justify-center ">
              <div>
                <p className="dark:text-white-color">{userData?.bio}</p>
                <NavLink
                  className="dark:text-white-color"
                  to={userData?.website}
                >
                  {userData?.website}
                </NavLink>
                <p className="dark:text-white-color">
                  {" "}
                  joined at -{" "}
                  {` ${new Date(userData?.createdAt)
                    .toDateString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")}`}
                </p>
              </div>
              <div className="flex items-center justify-around ">
                <p className="font-medium dark:text-white-color">
                  {postState?.userPost?.length} posts
                </p>
                <p className="font-medium dark:text-white-color">
                  {userData?.followers?.length} followers
                </p>
                <p className="font-medium dark:text-white-color">
                  {userData?.following?.length} following
                </p>
              </div>
            </div>
          </div>

          {postLoading ? (
            <div className="w-[40px] h-[40px]">
              <Loader />
            </div>
          ) : (
            <div className="  flex flex-col gap-4 ">
              {currentUserPost?.length === 0 ? (
                <p className="text-xl font-bold text-center dark:text-white-color">
                  No posts yet!
                </p>
              ) : (
                currentUserPost?.map((post) => <PostCard post={post} />)
              )}
            </div>
          )}
        </div>

        <div className="bg-white-color p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  lg:hidden dark:bg-dark-primary">
          <strong>
            <p className="dark:text-white-color">Users you might know</p>
          </strong>
          {userLoading ? (
            <div className="w-[40px] h-[40px]">
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-col gap-4 justify-center">
              {filteredUsers.map((users) => (
                <SuggestedUserCard user={users} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Modal
        open={editProfileModal}
        onClose={closeEditProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <form
            onSubmit={editProfileHandler}
            className="bg-white-color p-8 rounded-[0.5rem] flex flex-col justify-between gap-4 min-h-[15rem] min-w-[25rem] outline-none border-none dark:bg-dark-secondary"
          >
            <p className="text-2xl font-medium dark:text-white-color">
              Edit Profile
            </p>
            <div className="flex gap-4 items-center">
              <div title="Browse Image" className="relative">
                <img
                  src={userData?.profileImg}
                  className="rounded-[50%] w-[50px] h-[50px] object-cover  opacity-[0.8]"
                />
                <label className="absolute bottom-[10%] left-[40%] cursor-pointer">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        profileImg: URL.createObjectURL(e.target.files[0]),
                      });
                    }}
                  />
                  <AddAPhotoOutlinedIcon />
                </label>
              </div>
              <div title="Select from avatar" className="relative">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="rounded-[50%] w-[50px] h-[50px] object-cover  opacity-[0.8] "
                />
                <div
                  className="absolute bottom-[10%] left-[40%] cursor-pointer"
                  onClick={() => {
                    openAvatarModal();
                  }}
                >
                  <AddAPhotoOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="flex gap-8 items-center ">
              <p className="text-lg dark:text-white-color">First Name - </p>
              <input
                className="border border-solid border-primary-color px-2 py-1 rounded-[0.5rem] dark:text-white-color dark:bg-dark-primary"
                type="text"
                value={userData?.firstName}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex gap-8 items-center">
              <p className="text-lg dark:text-white-color">Last Name - </p>
              <input
                className="border border-solid border-primary-color px-2 py-1 rounded-[0.5rem] dark:text-white-color dark:bg-dark-primary"
                type="text"
                value={userData?.lastName}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p className="text-lg dark:text-white-color">Website - </p>
              <textarea
                className="border border-solid border-primary-color px-2 py-1 rounded-[0.5rem] dark:text-white-color dark:bg-dark-primary "
                rows={2}
                cols={40}
                value={userData?.website}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    website: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg dark:text-white-color">Bio - </p>
              <textarea
                className="border border-solid border-primary-color px-2 py-1 rounded-[0.5rem] dark:text-white-color dark:bg-dark-primary "
                rows={4}
                cols={40}
                value={userData?.bio}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    bio: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="flex items-center gap-8">
              <button
                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                onClick={() => closeEditProfileModal()}
              >
                Cancel
              </button>
              <button
                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        open={avatarModal}
        onClose={closeAvatareModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <div className="bg-white-color p-8 rounded-[0.5rem] flex flex-col justify-center items-center gap-4 min-h-[15rem] min-w-[25rem] outline-none border-none dark:bg-dark-secondary ">
            <ul className="flex items-center flex-wrap gap-4 justify-around">
              {avatars?.map((item) => (
                <img
                  style={{
                    border:
                      image === item ? "2px solid rgba(29, 155, 240, 1)" : "",
                  }}
                  className="rounded-[50%] w-[85px] h-[85px] object-cover border border-solid border-black overflow-hidden cursor-pointer hover:opacity-[0.7] "
                  src={item}
                  alt="avatar"
                  onClick={() => setImage(item)}
                />
              ))}
            </ul>
            <div className="flex items-center gap-8">
              <button
                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                onClick={() => closeAvatareModal()}
              >
                Cancel
              </button>
              <button
                className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                onClick={() => {
                  closeAvatareModal();
                  setUserData({ ...userData, profileImg: image });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
