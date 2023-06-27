import { useParams } from "react-router-dom";

import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import { PostCard } from "../../Component/PostContainer";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
export const PostDetails = () => {
  const { filteredUsers } = useUserContext();
  const { postState } = usePostContext();

  const { postId } = useParams();
  const findPost = postState?.allPost?.find((item) => item?._id === postId);
  console.log(findPost);
  return (
    <div className="bg-light-primary-color min-h-screen ">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-around  pt-[6rem] ">
        <div className="bg-white h-max rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <SideBar />
        </div>
        <div className="  flex flex-col gap-4 overflow-y-auto h-[86vh] post-scroll no-scroll ">
          <div>
            <PostCard post={findPost} />
          </div>
          <div className="flex gap-4 items-center w-[40rem]">
            <input
              type="text"
              placeholder="add comment"
              className="w-full px-4 py-2 rounded-[0.5rem] border-none outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
            />
            <button className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white ">
              Comment
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-[0.5rem] h-fit flex flex-col gap-4 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]  ">
          <strong>
            <p>Users you might know</p>
          </strong>
          <ul className="flex flex-col gap-4">
            {filteredUsers.map((users) => (
              <SuggestedUserCard user={users} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
