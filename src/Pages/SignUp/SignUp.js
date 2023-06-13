import { NavLink } from "react-router-dom";
import Logo from "../../Asset/final_logo.png";
export const SignUp = () => {
  return (
    <form className=" w-[30rem] flex flex-col items-center py-[1rem] mx-auto mt-[4rem] rounded-[0.5rem] gap-[1rem] border-solid border-[1.5px] border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
      <img
        src={Logo}
        alt="logo"
        width={200}
        height={100}
        className="mb-[0.5rem]"
      />
      <h3 className="font-medium text-xl">SignUp</h3>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        First Name{" "}
        <input
          type="text"
          placeholder="first Name"
          className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="  flex flex-col  items-start gap-[0.5rem] font-medium">
        Last Name{" "}
        <input
          type="text"
          placeholder="last Name"
          className=" w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        User Name{" "}
        <input
          type="text"
          placeholder="user name"
          className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        Password{" "}
        <input
          type="password"
          placeholder="password"
          className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        Confirm Password{" "}
        <input
          type="password"
          placeholder="confirm password"
          className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <button className="text-[black] mt-[0.5rem] border-solid border-[1px] border-[black] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]">
        Create New Account
      </button>
      <p>
        {" "}
        Already have an account?{" "}
        <NavLink
          to="/"
          className="hover:text-secondary-color hover:font-medium"
        >
          Login
        </NavLink>
      </p>
    </form>
  );
};
