export const SuggestedUserCard = ({ user }) => {
  return (
    <div className=" w-[18rem]  m-auto rounded-[0.5rem] py-1 px-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex items-center justify-between">
        <img
          className="rounded-[50%] w-[40px] h-[40px] object-cover "
          src={user?.profileImg}
          alt=""
        />
        <strong>
          <p>@{user?.username}</p>
        </strong>
        <button className=" px-2 py-1 rounded-[0.5rem] font-bold  hover:bg-light-primary-color">
          Follow
        </button>
      </div>
    </div>
  );
};
