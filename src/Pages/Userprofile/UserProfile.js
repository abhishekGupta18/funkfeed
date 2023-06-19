import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";

import { useAuthContext } from "../../Context/AuthContext";

export const UserProfile = () => {
  const { userLogout } = useAuthContext();
  return (
    <div className="bg-light-primary-color min-h-screen  ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.5rem]">
          <SideBar />
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto h-[86vh]  no-scroll">
          <div className="bg-white rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className=" w-[40rem] flex justify-between p-4 items-center ">
              <div className="flex items-center gap-4 ">
                <img
                  title="user profile"
                  src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp"
                  alt="user-profile"
                  className="rounded-[50%] w-[60px] h-[60px] object-cover "
                />
                <div>
                  <strong>
                    <p>Adarsh Balika</p>
                  </strong>
                  <p>@adarshBalika</p>
                </div>
              </div>
              <div className="flex  items-center gap-4">
                <button className=" rounded-[0.5rem] font-bold px-2 py-1 text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                  Edit Profile
                </button>
                <button
                  className=" rounded-[0.5rem] font-bold px-2 py-1 text-base bg-light-primary-color hover:bg-[#ef4444] transition-all duration-300  hover:text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
                  onClick={() => userLogout()}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className=" w-[40rem] flex flex-col gap-2 p-4 justify-center ">
              <p>never wanted perfect just real</p>
              <p>https://supersole.netlify.app/</p>
              <div className="flex justify-around">
                <p className="font-medium">5 posts</p>
                <p className="font-medium">2 followers</p>
                <p className="font-medium">5 following</p>
              </div>
            </div>
          </div>

          <div className="  flex flex-col gap-4 ">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  ">
          <strong>
            <p>Users you might know</p>
          </strong>
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
        </div>
      </div>
    </div>
  );
};
