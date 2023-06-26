import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";

import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
export const Home = () => {
  const { filteredUsers } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState } = usePostContext();

  const userFollowing = userInfo?.following?.map(({ username }) => username);
  const followedUserPost = postState?.allPost?.filter((post) =>
    userFollowing.includes(post?.username)
  );

  let userFeed = [];

  userFeed = [
    ...userFeed,
    ...postState?.allPost?.filter(
      (user) => user?.username === userInfo.username
    ),
    ...followedUserPost,
  ];

  return (
    <div className="bg-light-primary-color min-h-screen  ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>

        <div className=" flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll ">
          {userFeed?.map((post) => (
            <PostCard post={post} />
          ))}
        </div>

        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  ">
          <strong>
            <p>Users you might know</p>
          </strong>
          <ul className="flex flex-col gap-4">
            {filteredUsers?.map((user) => (
              <SuggestedUserCard user={user} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
