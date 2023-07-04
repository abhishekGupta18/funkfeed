import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthContextProvider } from "./Context/AuthContext";
import { UserContextProvider } from "./Context/userContext";
import { PostContextProvider } from "./Context/PostContext";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { CommentContextProvider } from "./Context/CommentsContext";
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <CommentContextProvider>
                <App />
              </CommentContextProvider>
            </PostContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
