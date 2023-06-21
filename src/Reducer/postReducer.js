export const postReducer = (postState, action) => {
  switch (action.type) {
    case "get_all_post":
      return { ...postState, allPost: action?.payload };
    case "get_user_post":
      return { ...postState, userPost: action?.payload };
  }
};
