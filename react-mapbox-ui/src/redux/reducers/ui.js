import * as actions from "../actionTypes";

/* the name of the export will be the key for the value un the store*/
export const showMenu = (state = false, action) => {
    switch (action.type) {
        case actions.TOGGLE_MENU: {
            return action.payload;
        }
        default:
            return state;
    }
};