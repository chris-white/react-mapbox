import { combineReducers } from "redux";

/* imports for reducers*/
import { selectedAddress, searchResults, searchToken } from "./search";

/* Combines all reducers so they can be easily registered with the redux store. */
export default combineReducers({ selectedAddress, searchResults, searchToken});
