import {
  GET_MATERIAL,
  MATERIAL_LOADING,
  CLEAR_CURRENT_MATERIAL
} from "../actions/types";

const initialState = {
  material: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MATERIAL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MATERIAL:
      return {
        ...state,
        material: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_MATERIAL:
      return {
        ...state,
        material: null
      };
    default:
      return state;
  }
}
