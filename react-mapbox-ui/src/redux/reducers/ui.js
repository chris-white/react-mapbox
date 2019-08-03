import * as actions from "../actionTypes";

export const ui = (state = {}, action) => {
    switch (action.type) {
        case actions.ui.TOGGLE_MENU : {
            return {
                ...state,
                showMenu: action.payload
            };
        }
        case actions.ui.SHOW_LOGIN : {
            return {
                ...state,
                showLogin : action.payload
            };
        }
        case actions.login.LOGIN_SUCCESS : {
            return {
                ...state,
                showLogin: false
            }
        }
        default:
            return state;
    }
};