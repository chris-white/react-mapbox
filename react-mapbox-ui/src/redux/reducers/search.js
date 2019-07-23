import * as actions from "../actionTypes";

/* the name of the export will be the key fo the value un the store*/
export const selectedAddress = (state = {}, action) => {
    switch (action.type) {
        case actions.UPDATE_SELECTED_ADDRESS_DETAILS: {
            console.log(action.payload);
            return action.payload;
        }
        default:
            return state;
    }
}

export const searchResults = (state = {}, action) => {

    switch (action.type) {
        case actions.UPDATE_SEARCH_RESULTS: {
            console.log(action.payload.searchResults);
            return action.payload.searchResults;
        }
        default:
            return state;
    }

}

export const searchToken = (state = "", action) => {

    switch (action.type) {
        case actions.UPDATE_SEARCH_TOKEN: {
            console.log(action.payload.tokenUUID);
            return action.payload.tokenUUID;
        }
        default:
            return state;
    }

}