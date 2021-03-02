import { combineReducers } from "redux";
import employees from "./employeeReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  employees,
  apiCallsInProgress
});

export default rootReducer;