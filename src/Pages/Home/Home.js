import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";

import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
export const Home = () => {
  const { usersState } = useUserContext();
  const { userInfo } = useAuthContext();
  return (
    <div className="bg-light-primary-color min-h-screen  ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        <div className="  flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll ">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  ">
          <strong>
            <p>Users you might know</p>
          </strong>
          <ul className="flex flex-col gap-4">
            {usersState
              ?.filter((user) => user?.username != userInfo?.username)
              .map((users) => (
                <SuggestedUserCard user={users} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
