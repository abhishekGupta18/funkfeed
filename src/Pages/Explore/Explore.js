import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import Loader from "../../Component/Loader";
import { usePostContext } from "../../Context/PostContext";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
export const Explore = () => {
  const { postState, postLoading } = usePostContext();
  const { userLoading, filteredUsers } = useUserContext();
  const { userInfo } = useAuthContext();

  return (
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        {postLoading ? (
          <div className="w-[40px] h-[40px]">
            <Loader />
          </div>
        ) : (
          <div className="  flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[86vh] post-scroll no-scroll sm:mb-8 ">
            {postState?.allPost
              ?.filter((post) => post?.username !== userInfo?.username)
              .map((post) => (
                <PostCard key={post?._id} post={post} />
              ))}
          </div>
        )}
        <div className="bg-white-color p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:hidden dark:bg-dark-primary">
          <strong>
            <p className="dark:text-white-color">Users you might know</p>
          </strong>
          {userLoading ? (
            <div className="w-[40px] h-[40px]">
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {filteredUsers.map((users) => (
                <SuggestedUserCard key={users?._id} user={users} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
