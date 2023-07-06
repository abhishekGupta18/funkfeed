import { NavLink } from "react-router-dom";
import ErrorImg from "../../Asset/404-error.png";

export const PageNotFound = () => {
  return (
    <div className=" h-[100vh] flex items-center justify-center bg-light-primary-color dark:bg-dark-secondary ">
      <div className="flex flex-col items-center gap-4">
        <img src={ErrorImg} alt="404-error" />
        <NavLink to="/">
          {" "}
          <button className=" rounded-[0.5rem] font-bold px-[1.6rem] py-2 text-base bg-light-primary-color hover:bg-primary-color transition-all duration-300  hover:text-white-color shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-dark-navbar dark:text-white-color dark:border dark:border-white-color dark:border-solid dark:hover:text-black-color dark:hover:bg-light-primary-color">
            Back To Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};
