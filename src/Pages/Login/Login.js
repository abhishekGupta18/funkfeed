import { NavLink } from "react-router-dom";

import Slider from "../../Component/Slider";
import { useAuthContext } from "../../Context/AuthContext";

import Logo from "../../Asset/final_logo.png";
import { useState } from "react";

export const Login = () => {
  const { userLogin } = useAuthContext();

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });
  const guestUserData = {
    username: "abhi",
    password: "abhi@123",
  };
  const userLoginHandler = (event) => {
    event.preventDefault();
    userLogin(userLoginData);
  };
  return (
    <div className="flex flex-row gap-[10%] h-screen items-center justify-center bg-light-primary-color p-8 ">
      <div className="w-[40rem] rounded-[0.5rem] overflow-hidden md:hidden">
        <Slider />
      </div>

      <form
        onSubmit={userLoginHandler}
        className="   flex flex-col justify-start items-center gap-[1rem]  md:w-[22rem] md:p-4  md:rounded-[0.5rem]  md:shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
      >
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
            required
            type="text"
            placeholder="username"
            value={userLoginData.username}
            onChange={(e) => {
              setUserLoginData({ ...userLoginData, username: e.target.value });
            }}
            className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color "
          />
        </label>
        <label className="flex flex-col items-start gap-[0.5rem] font-medium">
          Password{" "}
          <input
            required
            type="text"
            placeholder="password"
            value={userLoginData.password}
            onChange={(e) => {
              setUserLoginData({ ...userLoginData, password: e.target.value });
            }}
            className=" outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <button
          type="submit"
          title="login"
          className="  text-[black] mt-[0.5rem] border-solid border-[1px] border-[black] px-[1.5rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]"
        >
          Login
        </button>
        <button
          type="submit"
          title="guest login"
          onClick={() => setUserLoginData(guestUserData)}
          className=" text-[black] border-solid border-[1px] border-[black] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]"
        >
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
