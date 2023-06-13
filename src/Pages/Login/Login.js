import Slider from "../../Component/Slider/Slider";
import Logo from "../../Asset/final_logo.png";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <div className="w-[40%] rounded-[0.5rem] overflow-hidden ">
        <Slider />
      </div>

      <form className=" w-[30%]  flex flex-col justify-start items-center gap-[1rem] ">
        <img
          src={Logo}
          alt="logo"
          width={200}
          height={100}
          className="mb-[0.5rem]"
        />

        <label className="flex flex-col items-start gap-[0.5rem] font-medium">
          Username{" "}
          <input
            type="text"
            placeholder="username"
            className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color "
          />
        </label>
        <label className="flex flex-col items-start gap-[0.5rem] font-medium">
          Password{" "}
          <input
            type="text"
            placeholder="password"
            className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <button className="text-[black] mt-[0.5rem] border-solid border-[1px] border-[black] px-[1.5rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]">
          Login
        </button>
        <button className=" text-[black] border-solid border-[1px] border-[black] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]">
          Login as guest
        </button>
        <p>
          Don't have an account?{" "}
          <NavLink
            to="/signUp"
            className="hover:text-secondary-color hover:font-medium"
          >
            SignUp
          </NavLink>
        </p>
      </form>
    </div>
  );
};
