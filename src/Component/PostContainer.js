import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUserContext } from "../Context/userContext";
import { useAuthContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostContext";

export const PostCard = ({ post }) => {
  const { usersState, addPostToBookmarks, removePostFromBookmarks } =
    useUserContext();
  const { likePost, dislikePost, postState, deletePost } = usePostContext();
  const { userInfo } = useAuthContext();

  const [editDeleteBtn, setEditDeleteBtn] = useState(false);

  const findUser = usersState?.allUsers?.find(
    (user) => user?.username === post?.username
  );

  const navigate = useNavigate();

  return (
    <article className="w-[40rem] flex flex-col justify-center bg-white rounded-[0.5rem]  gap-4  m-auto p-4 relative ">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src={findUser?.profileImg}
            alt=""
            className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer "
            onClick={() => navigate(`/userProfile/${findUser?.username}`)}
          />
          <div>
            <p className="font-medium">@{post?.username}</p>
            <p>{` ${new Date(post?.createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}`}</p>
          </div>
        </div>
        {post?.username === userInfo?.username && (
          <div
            className="cursor-pointer"
            title="edit | delete"
            onClick={() => setEditDeleteBtn(!editDeleteBtn)}
          >
            <MoreVertIcon />
          </div>
        )}

        {editDeleteBtn && (
          <div className="  flex flex-col gap-2 justify-center  rounded-[0.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute left-[80%] top-[5%] bg-white  ">
            <div className="flex justify-between hover:bg-light-primary-color rounded-t-[0.5rem]  px-2 py-1">
              <button>Edit</button>
              <EditIcon />
            </div>
            <div
              className="flex justify-between gap-1  hover:bg-light-primary-color rounded-b-[0.5rem] px-2 py-1"
              onClick={(e) => {
                deletePost(post?._id);
                setEditDeleteBtn(false);
              }}
            >
              <button>Delete</button>
              <DeleteIcon />
            </div>
          </div>
        )}
      </div>
      <p>{post?.content}</p>
      <div>
        <img
          src={post?.mediaURL}
          alt={post?.mediaAlt}
          className=" object-cover mx-auto "
        />
      </div>

      <div className="flex gap-4 items-center">
        <p>{post?.likes?.likeCount} Likes</p>
        <p>{post?.comments?.length} Comments</p>
      </div>
      <hr />
      <div className="flex gap-4 items-center">
        {post?.likes?.likedBy?.find(
          (item) => item?.username === userInfo?.username
        ) ? (
          <div
            title="dislike post"
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => dislikePost(post?._id)}
          >
            <FavoriteOutlinedIcon /> Liked
          </div>
        ) : (
          <div
            title="like post"
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => likePost(post?._id)}
          >
            <FavoriteBorderOutlinedIcon /> Like
          </div>
        )}
        <div title="comment" className="cursor-pointer flex items-center gap-2">
          <ModeCommentOutlinedIcon /> Comment
        </div>
        {userInfo?.bookmarks?.some((item) => item?._id?.includes(post?._id)) ? (
          <div
            title="remove from bookmark"
            className="cursor-pointer flex items-center gap-2"
            onClick={() => removePostFromBookmarks(post?._id)}
          >
            <BookmarkOutlinedIcon /> Bookmarked
          </div>
        ) : (
          <div
            className="cursor-pointer flex items-center gap-2"
            title="bookmark"
            onClick={() => addPostToBookmarks(post?._id)}
          >
            <BookmarkBorderOutlinedIcon /> Bookmark
          </div>
        )}
        <div className="cursor-pointer flex items-center gap-2" title="share">
          <ShareIcon /> Share
        </div>
      </div>
      <hr />
    </article>
  );
};
