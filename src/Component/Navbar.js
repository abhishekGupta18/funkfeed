import { useNavigate } from "react-router-dom";

import Logo from "../Asset/final_logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "@mui/material";

import { useAuthContext } from "../Context/AuthContext";
import { useUserContext } from "../Context/userContext";
import { useState } from "react";

export const Navbar = () => {
  const [searchModal, setSearchModal] = useState(false);
  const { userInfo } = useAuthContext();
  const { usersState, followUsers, unFollowUsers } = useUserContext();
  const [searchUser, setSearchUser] = useState("");

  const navigate = useNavigate();

  const currentUser = usersState?.allUsers?.find(
    (user) => user?.username === userInfo?.username
  );

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
  console.log(searchByUsername, searchUser);
  return (
    <div className=" flex  justify-between items-center py-4 px-7 bg-[#bae6fd] opacity-8 ">
      <div>
        <img src={Logo} alt="logo" width={160} height={80} />
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => openSearchModal()}
      >
        <div>
          <input
            title="search user"
            type="text"
            placeholder="Search User"
            className="border border-black border-solid w-[20rem] px-4 py-1 rounded-[0.5rem] outline-none"
          />
        </div>
        <div title="search user" className="search-icon ml-[-2.5rem] ">
          <SearchIcon />
        </div>
      </div>
      <div title="dark mode" className="flex items-center gap-8  ">
        <div className="cursor-pointer">
          <DarkModeIcon />
        </div>
        <div className="cursor-pointer">
          <img
            title="user profile"
            src={currentUser?.profileImg}
            alt="user-profile"
            className="rounded-[50%] w-[40px] h-[40px] object-cover "
            onClick={() => navigate(`/userProfile/${currentUser?.username}`)}
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
          <div className="w-[25rem] bg-white rounded-[0.5rem] p-4  flex flex-col gap-4 ">
            <input
              value={searchUser}
              type="text"
              placeholder="search user"
              className="px-4 py-1 mx-auto w-[60%] rounded-[1rem] outline-none border border-solid border-primary-color"
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div>
              <ul className="flex flex-col gap-4">
                {searchByUsername?.map((user) => (
                  <li
                    className="flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 py-1 rounded-[0.5rem]"
                    onClick={() => navigate(`/userProfile/${user?.username}`)}
                  >
                    <div className="flex items-center gap-4  ">
                      <img
                        src={user?.profileImg}
                        className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer"
                      />
                      <p className="font-bold">@{user?.username}</p>
                    </div>
                    {userInfo?.username ===
                    user?.username ? null : userInfo?.following
                        ?.map((user) => user.username)
                        .includes(user?.username) ? (
                      <button
                        className=" rounded-[0.5rem] font-bold px-4 py-1 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
                        onClick={(e) => {
                          unFollowUsers(user?._id);
                          e.stopPropagation();
                        }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className=" rounded-[0.5rem] font-bold px-4 py-1 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
                        onClick={(e) => {
                          followUsers(user?._id);
                          e.stopPropagation();
                        }}
                      >
                        Follow
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
