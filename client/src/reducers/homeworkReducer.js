import { GET_USERS_HOMEWORK, USERS_HOMEWORK_LOADING } from "../actions/types";

const initialState = {
  users: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_HOMEWORK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_HOMEWORK:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
