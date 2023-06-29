import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";

import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

export const Home = () => {
  const { filteredUsers } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState, trending, setTrending, latest, setLatest } =
    usePostContext();

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

  const trendingPosts = trending
    ? userFeed?.sort((a, b) => b?.likes?.likeCount - a?.likes?.likeCount)
    : userFeed;

  const latestPosts = latest
    ? trendingPosts?.sort(
        (a, b) => Date.parse(b?.createdAt) - Date.parse(a?.createdAt)
      )
    : trendingPosts;
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
          {latestPosts?.map((post) => (
            <PostCard post={post} />
          ))}
        </div>

        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-8 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  ">
          <div className="flex items-center justify-around  w-full ">
            <label
              className=" flex items-center gap-1 border border-solid bg-light-primary-color border-light-primary-color rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-primary-color hover:text-white hover:border-primary-color"
              onClick={() => {
                setLatest(true);
                setTrending(false);
              }}
            >
              <button className="text-xl px-4 py-1">Latest</button>
              <CalendarMonthOutlinedIcon />
            </label>
            <label
              className="flex items-center  gap-1 border border-solid bg-light-primary-color border-light-primary-color rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-primary-color hover:text-white hover:border-primary-color"
              onClick={() => {
                setTrending(true);
                setLatest(false);
              }}
            >
              <button className="text-xl px-4 py-1">Trending</button>
              <WhatshotOutlinedIcon />
            </label>
          </div>
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
