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
    createdAt: "2023-06-06T01:06:00+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: "njsjkw82n_i83s_882j_ojiu38jsk9",
        username: "anuj",
        text: "friends forever🙌🤩.",
        createdAt: "2023-06-06T01:06:00+05:30",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
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
      likeCount: 45,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vivek",
    createdAt: "2022-07-09T01:06:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content: "Happiest Birthday Bhaiya 🤩🙌. #bestMentor",
    mediaURL:
      "https://media.licdn.com/dms/image/C5103AQGVpPvlt0HvkA/profile-displayphoto-shrink_400_400/0/1562407621248?e=1693440000&v=beta&t=jdPBEujW48l6EFGY-ESM8sI-kYl1pAVFyaTIRn8CIFE",
    mediaAlt: "Tanay Pratap",
    likes: {
      likeCount: 55,
      likedBy: [],
      dislikedBy: [],
    },
    username: "abhi",
    createdAt: "2023-06-15T01:06:00+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: "n_i83s_882j_ojiujsk9",
        username: "vivek",
        text: "Happiest Birthday Bhaiya 🙌.",
        createdAt: "2023-06-030T01:06:00+05:30",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
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
    createdAt: "2023-05-02T01:06:00+05:30",
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
    content: "The Man, The Myth, The Legend👑.",
    mediaURL:
      "https://staticg.sportskeeda.com/wp-content/uploads/2016/03/516527328-1458418945-800.jpg",
    mediaAlt: "virat kohli",
    likes: {
      likeCount: 20,
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
    content: "Monday Motivation🙌",
    mediaURL:
      "https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    mediaAlt: "laptop",
    likes: {
      likeCount: 14,
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
  {
    _id: uuid(),
    content:
      "To me, it doesn't matter whether it's raining or the sun is shining or whatever: as long as I'm riding a bicycle, I know I'm the luckiest guy in the world.",
    mediaURL:
      "https://images.pexels.com/photos/289869/pexels-photo-289869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaAlt: "bicycle",
    likes: {
      likeCount: 55,
      likedBy: [],
      dislikedBy: [],
    },
    username: "abhi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
];
