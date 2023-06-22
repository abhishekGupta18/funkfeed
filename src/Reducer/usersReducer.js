export const usersReducer = (usersState, action) => {
  switch (action.type) {
    case "get_users":
      return { ...usersState, allUsers: action.payload };
    case "follow_user":
      return { ...usersState, user: action.payload };
    case "unfollow_user":
      return { ...usersState, user: action.payload };
  }
};
