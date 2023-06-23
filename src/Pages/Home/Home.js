import { Navbar } from "../../Component/Navbar";
import { SideBar } from "../../Component/SideBar";
import { PostCard } from "../../Component/PostContainer";
import { SuggestedUserCard } from "../../Component/SuggestedUserCard";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Modal } from "@mui/material";

import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/userContext";
import { usePostContext } from "../../Context/PostContext";
export const Home = () => {
  const { filteredUsers } = useUserContext();
  const { userInfo } = useAuthContext();
  const { postState, openNewPostModal, closeNewPostModal, openPostModal } =
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
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
          <div
            className="bg-white flex items-center gap-8 p-4 rounded-[0.5rem] cursor-pointer"
            onClick={() => {
              openNewPostModal();
            }}
          >
            <img
              src={userInfo?.profileImg}
              alt="user profile image"
              className="rounded-[50%] w-[50px] h-[50px] object-cover cursor-pointer "
            />
            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full px-4 py-2 rounded-[0.5rem]">
              What is happening?!
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            {userFeed?.map((post) => (
              <PostCard post={post} />
            ))}
          </div>
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
      <Modal
        open={openPostModal}
        onClose={closeNewPostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ ...style }}>
          <div className="bg-white p-4 rounded-[0.5rem] flex flex-col justify-between gap-4 h-[15rem] w-[25rem] ">
            <input
              type="text"
              placeholder="What is happening?!"
              className="p-2 border-none outline-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-4 ">
                <EmojiEmotionsOutlinedIcon />
                <AddPhotoAlternateOutlinedIcon />
              </div>
              <div className="flex gap-4">
                <button
                  className="border-solid border-primary-color border px-2 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white"
                  onClick={() => closeNewPostModal()}
                >
                  Cancel
                </button>
                <button className="border-solid border-primary-color border px-3 py-1 rounded-[0.5rem] font-semibold hover:bg-primary-color hover:text-white ">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
