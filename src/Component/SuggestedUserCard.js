import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
export const SuggestedUserCard = ({ user }) => {
  const navigate = useNavigate();
  const { followUsers } = useUserContext();

  return (
    <div className=" w-[18rem]  m-auto rounded-[0.5rem] py-1 px-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:w-[13rem] dark:border dark:border-white-color dark:border-solid">
      <div className="flex items-center justify-between ">
        <img
          className="rounded-[50%] w-[40px] h-[40px] object-cover cursor-pointer"
          src={user?.profileImg}
          alt=""
          onClick={() => navigate(`/userProfile/${user?.username}`)}
        />
        <strong>
          <p className=" text-black-color dark:text-white-color">
            @{user?.username}
          </p>
        </strong>
        <button
          className=" px-2 py-1 rounded-[0.5rem] font-bold text-black-color hover:bg-light-primary-color dark:text-white-color dark:hover:text-black-color"
          onClick={() => followUsers(user?._id)}
        >
          Follow
        </button>
      </div>
    </div>
  );
};
