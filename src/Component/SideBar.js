import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
export const SideBar = () => {
  return (
    <div className=" w-[18rem]   border-solid border border-black py-4  flex flex-col gap-5 rounded-[0.5rem] mx-auto items-center ">
      <div className="flex justify-center gap-[1rem] cursor-pointer  py-2  w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.5rem] hover:bg-light-primary-color ">
        <HomeIcon />
        <p className="font-bold">Home</p>
      </div>

      <div className="flex gap-[1rem] justify-center cursor-pointer py-2  w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.5rem] hover:bg-light-primary-color ">
        <ExploreIcon />
        <p className="font-bold">Explore</p>
      </div>
      <div className="flex gap-[1rem] justify-center cursor-pointer pl-5  py-2 w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.5rem] hover:bg-light-primary-color ">
        <BookmarksIcon />
        <p className="font-bold">Bookmarks</p>
      </div>
      <div className="flex gap-[1rem] justify-center cursor-pointer py-2 w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.5rem] hover:bg-light-primary-color">
        <ManageAccountsIcon />
        <p className="font-bold">Profile</p>
      </div>
      <div
        title="add post"
        className=" mb-[5rem] mt-[2rem] cursor-pointer addPost "
      >
        <AddCircleOutlineIcon />
      </div>
      <button className="w-[90%]  rounded-[0.5rem] font-bold py-2  text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
        Logout
      </button>
    </div>
  );
};
