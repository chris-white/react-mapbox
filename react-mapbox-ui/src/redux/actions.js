/* Redux action creators */
import * as actions from "./actionTypes";

export const selectAddress = (placeId, searchToken) => ({
    type: actions.SELECT_ADDRESS,
    payload: {placeId, searchToken}
});

export const searchUpdated = (searchTerm, searchToken) => ({
    type: actions.SEARCH_UPDATED,
    payload: {searchTerm, searchToken}
});