import { useNavigate } from "react-router-dom";

import Logo from "../Asset/final_logo.png";
import LogoDarkMode from "../Asset/dark mode logo.jpeg";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Modal } from "@mui/material";

import { useThemeContext } from "../Context/ThemeContext";
import { useAuthContext } from "../Context/AuthContext";
import { useUserContext } from "../Context/userContext";
import { useState } from "react";

export const Navbar = () => {
  const [searchModal, setSearchModal] = useState(false);
  const { userInfo } = useAuthContext();
  const { usersState, followUsers, unFollowUsers } = useUserContext();
  const [searchUser, setSearchUser] = useState("");
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const navigate = useNavigate();

  const openSearchModal = () => setSearchModal(true);
  const closeSearchModal = () => setSearchModal(false);
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

  const searchByUsername =
    searchUser?.length >= 0
      ? usersState?.allUsers?.filter((item) =>
          item?.username?.toLowerCase().includes(searchUser?.toLowerCase())
        )
      : usersState?.allUsers;
  return (
    <div className=" flex  justify-between items-center py-4 px-7 bg-[#bae6fd] opacity-8  dark:bg-dark-navbar ">
      {isDarkMode ? (
        <div className=" msm:w-[100px] ">
          <img src={LogoDarkMode} alt="logo" width={160} height={80} />
        </div>
      ) : (
        <div className=" dark:bg-white-color msm:w-[120px] ">
          <img src={Logo} alt="logo" width={160} height={80} />
        </div>
      )}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => openSearchModal()}
      >
        <div>
          <input
            title="search user"
            type="text"
            placeholder="Search User"
            className="border border-black border-solid w-[20rem] px-4 py-2 rounded-[0.5rem] outline-none sm:hidden dark:bg-dark-primary dark:text-white-color dark:border-white-color"
          />
        </div>
        <div
          title="search user"
          className="search-icon ml-[-2.5rem] sm:w-[2.5rem] sm:h-[2.5rem] sm:pl-2 sm:pt-[0.40rem] sm:bg-white-color sm:ml-0 sm:rounded-[50%] dark:text-white-color dark:sm:bg-dark-primary dark:sm:text-white-color"
        >
          <SearchIcon />
        </div>
      </div>
      <div className="flex items-center gap-8  ">
        {isDarkMode ? (
          <div
            title="light mode"
            className="cursor-pointer light-mode"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <LightModeIcon />
          </div>
        ) : (
          <div
            title="dark mode"
            className="cursor-pointer"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
          >
            <DarkModeIcon />
          </div>
        )}
        <div className="cursor-pointer">
          <img
            title="user profile"
            src={userInfo?.profileImg}
            alt="user-profile"
            className="rounded-[50%] w-[40px] h-[40px] object-cover "
            onClick={() => navigate(`/userProfile/${userInfo?.username}`)}
          />
        </div>
      </div>

      <Modal
        open={searchModal}
        onClose={closeSearchModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <div className="w-[25rem] bg-white-color rounded-[0.5rem] p-4  flex flex-col gap-4 dark:bg-dark-secondary ">
            <div className="flex items-center justify-center">
              <input
                value={searchUser}
                type="text"
                placeholder="search user"
                className="px-4 py-1 mx-auto w-[60%] rounded-[1rem] outline-none border border-solid border-primary-color dark:bg-dark-primary dark:text-white-color dark:border-white-color"
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <div
                className="mr-4 dark:text-white-color cursor-pointer"
                onClick={() => closeSearchModal()}
              >
                <CancelOutlinedIcon />
              </div>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                {searchByUsername?.length === 0 ? (
                  <p className=" mx-auto dark:text-white-color ">
                    there is no such user with username{" "}
                    <strong>{searchUser}</strong>
                  </p>
                ) : (
                  searchByUsername
                    ?.filter((item) => item?.username !== userInfo?.username)
                    .map((user) => (
                      <li
                        key={user?._id}
                        className="flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 py-1 rounded-[0.5rem] dark:border dark:border-solid border-white-color "
                        onClick={() =>
                          navigate(`/userProfile/${user?.username}`)
                        }
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={user?.profileImg}
                            className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer"
                          />
                          <p className="font-bold dark:text-white-color">
                            @{user?.username}
                          </p>
                        </div>
                        {userInfo?.following
                          ?.map((user) => user.username)
                          .includes(user?.username) ? (
                          <button
                            className=" rounded-[0.5rem] font-bold px-4 py-1 text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                            onClick={(e) => {
                              unFollowUsers(user?._id);
                              e.stopPropagation();
                            }}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className=" rounded-[0.5rem] font-bold px-[1.6rem] py-1 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                            onClick={(e) => {
                              followUsers(user?._id);
                              e.stopPropagation();
                            }}
                          >
                            Follow
                          </button>
                        )}
                      </li>
                    ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
