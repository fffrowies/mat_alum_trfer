import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import materialReducer from "./materialReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  material: materialReducer
});
