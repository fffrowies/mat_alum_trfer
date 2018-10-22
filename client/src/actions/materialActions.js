import axios from "axios";
import {
  GET_MATERIAL,
  MATERIAL_LOADING,
  CLEAR_CURRENT_MATERIAL
  // SET_CURRENT_USER,
  // GET_ERRORS
} from "./types";

// Get material
export const getMaterial = () => dispatch => {
  dispatch(setMaterialLoading());
  axios
    .get("/api/material")
    .then(res =>
      dispatch({
        type: GET_MATERIAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATERIAL,
        payload: {}
      })
    );
};

// Material loading
export const setMaterialLoading = () => {
  return {
    type: MATERIAL_LOADING
  };
};

// Clear material
export const clearCurrentMaterial = () => {
  return {
    type: CLEAR_CURRENT_MATERIAL
  };
};
