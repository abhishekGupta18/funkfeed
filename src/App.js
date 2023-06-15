import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Home } from "./Pages/Home/Home";
import { Explore } from "./Pages/Explore/Explore";
import { UserProfile } from "./Pages/Userprofile/UserProfile";
import { BookMarks } from "./Pages/Bookmarks/Bookmarks";
import { RequireAuth } from "./Component/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/bookmarks" element={<BookMarks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
