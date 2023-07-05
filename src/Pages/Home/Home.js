import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import Loader from "../../Component/Loader";

import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

export const Home = () => {
  const { filteredUsers, userLoading } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState, trending, setTrending, latest, setLatest, postLoading } =
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
    <div className="bg-light-primary-color min-h-screen dark:bg-dark-secondary ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>

        {postLoading ? (
          <div className="w-[100px] h-[100px]">
            <Loader />
          </div>
        ) : (
          <div className=" flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[86vh]  sm:mb-8">
            <div className=" hidden lg:flex lg:justify-around lg:gap-8 lg:w-[90%] lg:mx-auto">
              <button
                className="text-xl px-4 py-1 rounded-[0.5rem]  w-[50%] flex items-center justify-center gap-2 border border-solid bg-white-color border-black-color  hover:bg-primary-color hover:text-white-color  dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                onClick={() => {
                  setLatest(true);
                  setTrending(false);
                }}
              >
                Latest <CalendarMonthOutlinedIcon />
              </button>
              <button
                className="text-xl px-4 py-1 rounded-[0.5rem] w-[50%] flex items-center justify-center gap-2 border border-solid bg-white-color border-black-color  hover:bg-primary-color hover:text-white-color  dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
                onClick={() => {
                  setTrending(true);
                  setLatest(false);
                }}
              >
                Trending <WhatshotOutlinedIcon />
              </button>
            </div>

            {latestPosts?.length === 0 ? (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-xl font-bold dark:text-white-color">
                  No posts yet!
                </p>
                <p className="dark:text-white-color">Start following users.</p>
              </div>
            ) : (
              latestPosts?.map((post) => <PostCard post={post} />)
            )}
          </div>
        )}

        <div className="bg-white-color p-4 rounded-[0.5rem] h-fit flex flex-col gap-8 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:w-[15rem] lg:hidden dark:bg-dark-primary">
          <div className="flex items-center justify-around gap-4 w-[80%] ">
            <label
              className=" flex items-center gap-1 border border-solid bg-light-primary-color border-light-primary-color rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-primary-color hover:text-white-color hover:border-primary-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color"
              onClick={() => {
                setLatest(true);
                setTrending(false);
              }}
            >
              <button className="text-xl px-4 py-1 ">Latest</button>
              <div className="xl:hidden">
                <CalendarMonthOutlinedIcon />
              </div>
            </label>
            <label
              className="flex items-center  gap-1 border border-solid bg-light-primary-color border-light-primary-color rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-primary-color hover:text-white-color hover:border-primary-color dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color "
              onClick={() => {
                setTrending(true);
                setLatest(false);
              }}
            >
              <button className="text-xl px-4 py-1 ">Trending</button>
              <div className="xl:hidden">
                <WhatshotOutlinedIcon />
              </div>
            </label>
          </div>
          <strong>
            <p className="dark:text-white-color">Users you might know</p>
          </strong>
          {userLoading ? (
            <div className="w-[100px] h-[100px]">
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-col gap-4  ">
              {filteredUsers?.map((user) => (
                <SuggestedUserCard user={user} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
