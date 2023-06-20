export const postReducer = (postState, action) => {
  switch (action.type) {
    case "get_all_post":
      return { ...postState, allPost: action?.payload };
  }
};
