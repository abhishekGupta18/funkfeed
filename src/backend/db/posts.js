import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "True friends are not just acquaintances, but companions who journey with us through the highs and lows. They laugh with us during moments of pure delight and lend a listening ear when we need to pour out our hearts.",
    mediaURL:
      "https://images.pexels.com/photos/923657/pexels-photo-923657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "group of boys",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "abhi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "In the midst of our busy and often chaotic lives, finding moments of calm and clarity can feel like a distant dream. That's where meditation comes in—a gentle practice that allows us to reconnect with ourselves and experience the profound benefits of stillness.",
    mediaURL:
      "https://images.pexels.com/photos/8964915/pexels-photo-8964915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "meditation",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "janeDoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "Embrace the rhythm of the road, the beat of your heart, and let your feet carry you to places you've never been. 🏃‍♀️🏃‍♂️💨 #RunningFree #FeelTheWind #MilesOfBliss",
    mediaURL:
      "https://images.pexels.com/photos/1821694/pexels-photo-1821694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "running",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vivek",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "My brain has too many tabs open. It's like a web browser from the '90s, and I'm constantly waiting for it to crash.",
    mediaAlt: "",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "abhi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "🚀🖥️ Welcome to the incredible world of coding! 🌟✨ Prepare to unlock your creativity, problem-solving skills, and endless possibilities. Embrace the challenges, celebrate the victories, and never stop learning. You're about to embark on an amazing journey of innovation and growth. Happy coding! 🙌💻.",
    mediaURL: "",
    mediaAlt: "",
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anuj",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "Last night was an unforgettable blast, filled with laughter, dancing, and incredible memories! 🎉🥳✨ From dusk till dawn, we owned the dance floor and celebrated life's beautiful moments. Cheers to an epic night that will linger in our hearts forever! 🥂🌙 ",
    mediaURL:
      "https://images.pexels.com/photos/3414186/pexels-photo-3414186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "party image",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "amelia",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "The awkward moment when you wave at someone you thought you knew but then realize they were actually waving at the person behind you. Hello, social embarrassment!",
    mediaURL: "",
    mediaAlt: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vivek",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "Wanderlust ignited, new horizons await. Embrace the unknown, seek adventures, and let the world be your guide.",
    mediaURL:
      "https://images.pexels.com/photos/16238743/pexels-photo-16238743/free-photo-of-helicopter-flying-over-the-beach-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "cloud image",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "david",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
];
