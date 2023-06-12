import Slider from "../../Component/Slider/Slider";
import Logo from "../../Asset/final_logo.png";

export const Login = () => {
  return (
    <div className="flex flex-row h-screen items-center justify-center px-[5rem]   ">
      <div className="w-[50%] rounded-[0.5rem] overflow-hidden">
        <Slider />
      </div>

      <form className=" w-[50%]  flex flex-col justify-start items-center gap-[1.5rem]">
        <img src={Logo} width={200} height={100} />
        <label className="flex flex-col items-start gap-[0.5rem]">
          Username{" "}
          <input
            type="text"
            placeholder="username"
            className="border-solid border-[1px] border-[#271c19] px-[1rem] py-[0.3rem] rounded-[0.5rem]"
          />
        </label>
        <label className="flex flex-col items-start gap-[0.5rem]">
          Password{" "}
          <input
            type="text"
            placeholder="password"
            className="border-solid border-[1px] border-[#271c19] px-[1rem] py-[0.3rem] rounded-[0.5rem]"
          />
        </label>
        <button className="text-[#271c19] border-solid border-[1px] border-[#271c19] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-[#55423d] hover:text-[#ffff]">
          Login
        </button>
        <button className=" text-[#271c19] border-solid border-[1px] border-[#271c19] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-[#55423d] hover:text-[#ffff]">
          Login as guest
        </button>
      </form>
    </div>
  );
};
