export const usersReducer = (usersState, action) => {
  switch (action.type) {
    case "get_users":
      return { ...usersState, allUsers: action.payload };
    case "follow_user":
      return { ...usersState, user: action.payload };
    case "unfollow_user":
      return { ...usersState, user: action.payload };
    case "get_all_bookmarks":
      return {
        ...usersState,
        user: { ...usersState?.user, bookmarks: action.payload },
      };
    case "update_user_detail":
      return {
        ...usersState,
        user: action.payload,
        allUsers: usersState?.allUsers?.map((item) =>
          item?._id === action?.payload?._id ? { ...action?.payload } : item
        ),
      };
  }
};
