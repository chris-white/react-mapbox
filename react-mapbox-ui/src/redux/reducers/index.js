import { combineReducers } from "redux";

/* imports for reducers */
import * as searchReducers from "./search";
import * as uiReducers from "./ui";

/* Combine reducers from separate files into a single map of all reducers. */
export default combineReducers({...searchReducers, ...uiReducers})