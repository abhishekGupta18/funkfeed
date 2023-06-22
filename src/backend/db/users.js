import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "125t7cp",
    firstName: "Abhishek",
    lastName: "Gupta",
    username: "abhi",
    password: "abhi@123",
    bio: "never wanted perfect, just real !!🙌",
    profileImg:
      "https://res.cloudinary.com/dmmqvo37i/image/upload/v1687168190/profile_photo_fr8mp4.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "vdkdgdndg96",
    firstName: "Anuj",
    lastName: "Deshpandey",
    username: "anuj",
    password: "122@anuj",
    bio: "Capturing moments that inspire and ignite the soul 🔥📷",
    profileImg:
      "https://res.cloudinary.com/dmmqvo37i/image/upload/v1687169604/profile2_bzfm82.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "vivbhcss69jk",
    firstName: "Vivek",
    lastName: "Bhatt",
    username: "vivek",
    password: "tailwind@css",
    bio: "Aspiring Frontend Developer",
    profileImg: "https://avatars.githubusercontent.com/u/93856336?v=4",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "ebhtffhg6c",
    firstName: "Jane",
    lastName: "Doe",
    username: "janeDoe",
    password: "jane#123",
    bio: "Let's create beautiful memories together! 📷🌟",
    profileImg:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "ebhtffh",
    firstName: "Amelia",
    lastName: "Jhonshon",
    username: "amelia",
    password: "amelia@69",
    bio: "Believer in kindness, gratitude, and the power of a genuine smile 😄❤️",
    profileImg:
      "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "tffhg6c",
    firstName: "David",
    lastName: "Jhons",
    username: "david",
    password: "david@123#",
    bio: "not interested in writing bio😌",
    profileImg:
      "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
