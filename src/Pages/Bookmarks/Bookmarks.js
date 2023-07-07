import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import Loader from "../../Component/Loader";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
export const BookMarks = () => {
  const { filteredUsers, userLoading } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState, postLoading } = usePostContext();

  const userBookmarks = userInfo?.bookmarks?.map(({ _id }) => _id);

  return (
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary  ">
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
          <div className="  flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[86vh] sm:w-full  sm:mb-8 ">
            {userBookmarks?.length === 0 ? (
              <p className="text-xl font-bold dark:text-white-color flex items-center justify-center w-full">
                No Bookmarks Yet!
              </p>
            ) : (
              postState?.allPost
                ?.filter((post) => userBookmarks?.includes(post?._id))
                .map((post) => <PostCard key={post?._id} post={post} />)
            )}
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
