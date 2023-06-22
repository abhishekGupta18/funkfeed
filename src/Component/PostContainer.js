import { useNavigate } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";

import { useUserContext } from "../Context/userContext";

export const PostCard = ({ post }) => {
  const { usersState } = useUserContext();

  const findUser = usersState?.allUsers?.find(
    (user) => user?.username === post?.username
  );

  const navigate = useNavigate();

  return (
    <article className="w-[40rem] flex flex-col justify-center bg-white rounded-[0.5rem]  gap-4  m-auto p-4 ">
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
        <MoreVertIcon />
      </div>
      <p>{post?.content}</p>
      <div>
        <img
          src={post?.mediaURL}
          alt={post?.mediaAlt}
          className=" object-cover "
        />
      </div>

      <div className="flex gap-4">
        <FavoriteBorderOutlinedIcon />
        <ModeCommentOutlinedIcon />
        <BookmarkBorderOutlinedIcon />
        <ShareIcon />
      </div>
    </article>
  );
};
