import { useAuthContext } from "../../Context/AuthContext";
export const Home = () => {
  const { userLogout } = useAuthContext();
  return (
    <>
      {" "}
      <h1>this is home page</h1>
      <button onClick={() => userLogout()}>Logout</button>
    </>
  );
};
