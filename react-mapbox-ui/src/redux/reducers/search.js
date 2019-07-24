import * as actions from "../actionTypes";

/* the name of the export will be the key fo the value un the store*/
export const selectedAddress = (state = {}, action) => {
    switch (action.type) {
        case actions.UPDATE_SELECTED_ADDRESS_DETAILS: {
            return action.payload;
        }
        default:
            return state;
    }
}

export const searchResults = (state = {}, action) => {

    switch (action.type) {
        case actions.UPDATE_SEARCH_RESULTS: {
            return action.payload.searchResults;
        }
        default:
            return state;
    }
}

export const searchToken = (state = "", action) => {

    switch (action.type) {
        case actions.UPDATE_SEARCH_TOKEN: {
            return action.payload.tokenUUID;
        }
        default:
            return state;
    }

}

export const userLocation = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_USER_LOCATION: {
            return action.payload.userLocation;
        }
        default:
            return state;
    }

}