import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import loader from "../../Asset/loader.gif";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
export const BookMarks = () => {
  const { filteredUsers, userLoading } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState, postLoading } = usePostContext();

  const userBookmarks = userInfo?.bookmarks?.map(({ _id }) => _id);

  return (
    <div className="bg-light-primary-color min-h-screen ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        {postLoading ? (
          <img src={loader} alt="" className="w-[10rem] h-[10rem]" />
        ) : (
          <div className="  flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll ">
            {userBookmarks?.length === 0 ? (
              <p className="text-xl font-bold ">No Bookmarks Yet!</p>
            ) : (
              postState?.allPost
                ?.filter((post) => userBookmarks?.includes(post?._id))
                .map((post) => <PostCard post={post} />)
            )}
          </div>
        )}
        <div className="bg-white-color p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:hidden ">
          <strong>
            <p>Users you might know</p>
          </strong>
          {userLoading ? (
            <img src={loader} alt="" className="w-[5rem] h-[5rem]" />
          ) : (
            <ul className="flex flex-col gap-4">
              {filteredUsers.map((users) => (
                <SuggestedUserCard user={users} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
