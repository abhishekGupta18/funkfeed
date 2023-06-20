export const usersReducer = (usersState, action) => {
  switch (action.type) {
    case "get_users":
      return (usersState = action.payload);
  }
};
