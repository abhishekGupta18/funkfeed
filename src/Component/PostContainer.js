import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export const PostCard = () => {
  return (
    <article className="w-[35rem] flex flex-col justify-center rounded-[0.5rem]  gap-4 border border-black border-solid m-auto p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp"
            alt=""
            className="rounded-[50%] w-[40px] h-[40px] object-cover "
          />
          <div>
            <p>@adarshBalika</p>
            <p>a year ago</p>
          </div>
        </div>
        <MoreVertIcon />
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
        obcaecati asperiores magnam repellendus sunt doloremque blanditiis
      </p>
      <div>
        <img
          src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp"
          alt="post"
        />
      </div>

      <div className="flex gap-4">
        <FavoriteBorderOutlinedIcon />
        <ModeCommentOutlinedIcon />
        <BookmarkBorderOutlinedIcon />
      </div>
    </article>
  );
};
