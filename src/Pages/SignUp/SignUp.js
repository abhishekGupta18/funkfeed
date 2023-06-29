import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../Context/AuthContext";
import Logo from "../../Asset/final_logo.png";
import { useState } from "react";

export const SignUp = () => {
  const { userSignUp } = useAuthContext();
  const [userSignUpData, setUserSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg:
      "https://res.cloudinary.com/dvmkfd9qp/image/upload/v1687606137/81de73ff-b28e-45ae-a02f-4ce14d55e37e_xawjjg.png",
    bio: "edit your bio",
  });
  const handleUserSignUp = (event) => {
    event.preventDefault();
    if (userSignUpData?.confirmPassword === userSignUpData?.password) {
      userSignUp(userSignUpData);
    } else {
      alert("write correct password");
    }
  };
  return (
    <div className="bg-light-primary-color  py-[2rem] ">
      <form
        onSubmit={handleUserSignUp}
        className=" w-[25rem] flex flex-col items-center  mx-auto py-[2rem] rounded-[0.5rem] gap-[0.5rem] border-solid border-[1.5px] border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  "
      >
        <img
          src={Logo}
          alt="logo"
          width={200}
          height={100}
          className="mb-[0.2rem]"
        />
        <h3 className="font-medium text-xl">SignUp</h3>
        <label className="flex flex-col items-start gap-[0.2rem] font-medium">
          First Name{" "}
          <input
            required
            type="text"
            placeholder="first Name"
            value={userSignUpData?.firstName}
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                firstName: e.target.value,
              });
            }}
            className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <label className="  flex flex-col  items-start gap-[0.2rem] font-medium">
          Last Name{" "}
          <input
            required
            type="text"
            placeholder="last Name"
            value={userSignUpData?.lastName}
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                lastName: e.target.value,
              });
            }}
            className=" w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <label className="flex flex-col items-start gap-[0.2rem] font-medium">
          User Name{" "}
          <input
            required
            type="text"
            placeholder="user name"
            value={userSignUpData?.username}
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                username: e.target.value,
              });
            }}
            className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <label className="flex flex-col items-start gap-[0.2rem] font-medium">
          Email{" "}
          <input
            required
            type="email"
            placeholder="email"
            value={userSignUpData?.email}
            onChange={(e) => {
              setUserSignUpData({ ...userSignUpData, email: e.target.value });
            }}
            className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <label className="flex flex-col items-start gap-[0.2rem] font-medium">
          Password{" "}
          <input
            required
            type="password"
            placeholder="password"
            value={userSignUpData?.password}
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                password: e.target.value,
              });
            }}
            className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <label className="flex flex-col items-start gap-[0.2rem] font-medium">
          Confirm Password{" "}
          <input
            required
            type="password"
            placeholder="confirm password"
            value={userSignUpData?.confirmPassword}
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                confirmPassword: e.target.value,
              });
            }}
            className="w-[20rem] outline-none border-solid border-[1.5px] border-primary-color px-[1rem] py-[0.3rem] rounded-[0.5rem] hover:border-secondary-color"
          />
        </label>
        <button
          type="submit"
          className="text-[black] mt-[0.5rem] border-solid border-[1px] border-[black] px-[1rem] py-[0.5rem] font-bold rounded-[0.5rem] hover:bg-primary-color hover:text-[#ffff]"
        >
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
    </div>
  );
};
