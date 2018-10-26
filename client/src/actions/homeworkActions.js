import axios from "axios";
import {
  GET_USERS_HOMEWORK,
  USERS_HOMEWORK_LOADING,
  GET_ERRORS
} from "./types";

// Get users for SelectListGroup in CreateHomework
export const getUsersHomework = () => dispatch => {
  dispatch(setUsersHomeworkLoading());
  axios
    .get("/api/homework/users")
    .then(res =>
      dispatch({
        type: GET_USERS_HOMEWORK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS_HOMEWORK,
        payload: {}
      })
    );
};

// Create homework
export const createHomework = (homeworkData, history) => dispatch => {
  axios
    .post("/api/homework", homeworkData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setUsersHomeworkLoading = () => {
  return {
    type: USERS_HOMEWORK_LOADING
  };
};
