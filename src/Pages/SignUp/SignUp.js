import { NavLink } from "react-router-dom";
import Logo from "../../Asset/final_logo.png";
export const SignUp = () => {
  return (
    <form className=" w-[22rem] flex flex-col items-center py-[2rem] mx-auto mt-[4rem] rounded-[0.5rem] gap-[1rem] border-solid border-[1.5px] border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
      <img src={Logo} width={200} height={100} className="mb-[0.5rem]" />
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        First Name{" "}
        <input
          type="text"
          placeholder="first Name"
          className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        Last Name{" "}
        <input
          type="text"
          placeholder="last Name"
          className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        User Name{" "}
        <input
          type="text"
          placeholder="user name"
          className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        Password{" "}
        <input
          type="password"
          placeholder="password"
          className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <label className="flex flex-col items-start gap-[0.5rem] font-medium">
        Confirm Password{" "}
        <input
          type="password"
          placeholder="confirm password"
          className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
        />
      </label>
      <button className="text-[black] mt-[0.5rem] border-solid border-[1px] border-[black] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]">
        Create New Account
      </button>
      <p>
        {" "}
        Already have an account? <NavLink>Login</NavLink>
      </p>
    </form>
  );
};
