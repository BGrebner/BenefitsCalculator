import { combineReducers } from "redux";
import employees from "./employeeReducer";
import benefitsPreview from "./benefitsPreviewReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  employees,
  benefitsPreview,
  apiCallsInProgress
});

export default rootReducer;