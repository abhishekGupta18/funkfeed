export const authReducer = (authState, action) => {
  switch (action.type) {
    case "user_info":
      return {
        ...authState,
        userInfo: action.payload,
      };
    case "user_token":
      return {
        ...authState,
        token: action.payload,
      };
  }
};
