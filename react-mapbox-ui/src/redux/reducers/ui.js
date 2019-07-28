import * as actions from "../actionTypes";

export const ui = (state = {}, action) => {
    switch (action.type) {
        case actions.TOGGLE_MENU : {
            return {
                ...state,
                showMenu: action.payload
            };
        }
        case actions.SHOW_LOGIN : {
            return {
                ...state,
                showLogin : action.payload
            };
        }
        default:
            return state;
    }
};