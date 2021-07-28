import { FETCH_ALL_USERS, DELETE_USER } from "../constants/actionTypes.js";

// export default (users = [], action) => {
//   switch (action.type) {
//     case FETCH_ALL_USERS:
//       return action.payload;
//     case DELETE_USER:
//       return users.filter((user) => user._id !== action.payload);

//     default:
//       return users;
//   }
// };

const users = (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;
    case DELETE_USER:
      return users.filter((user) => user._id !== action.payload);

    default:
      return users;
  }
};

export default users;
