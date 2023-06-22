import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
export const AddPost = () => {
  return (
    <div>
      <input type="text" />
      <div>
        <div>
          <EmojiEmotionsOutlinedIcon />
          <AddPhotoAlternateOutlinedIcon />
        </div>
        <div>
          <button>Cancel</button>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};
