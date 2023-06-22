import { useNavigate } from "react-router-dom";

import Logo from "../Asset/final_logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

import { useAuthContext } from "../Context/AuthContext";
import { useUserContext } from "../Context/userContext";

export const Navbar = () => {
  const { userInfo } = useAuthContext();
  const { usersState } = useUserContext();

  const navigate = useNavigate();

  const currentUser = usersState?.allUsers?.find(
    (user) => user?.username === userInfo?.username
  );
  return (
    <div className=" flex  justify-between items-center py-4 px-7 bg-[#bae6fd] opacity-8 ">
      <div>
        <img src={Logo} alt="logo" width={160} height={80} />
      </div>
      <div className="flex items-center">
        <div>
          <input
            title="search user"
            type="text"
            placeholder="Search User"
            className="border border-black border-solid w-[20rem] px-4 py-1 rounded-[0.5rem] outline-none"
          />
        </div>
        <div title="search user" className="search-icon">
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
    </div>
  );
};
