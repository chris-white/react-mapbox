import * as actions from "../actionTypes";
import * as auth from "../../service/auth";

// the login reducer stores data about the current login (authentication), this is the username and JWT key.
export const login = (state = {}, action) => {
    switch (action.type) {
        case actions.login.LOGIN_SUCCESS : {
            auth.setJwtToken(action.payload.token);
            return action.payload;
        }
        case actions.login.LOGOUT : {
            return {};
        }
        default :
            return state;
    }
};

// the loginFormData reducer stores data for the login form fields, including errors for fields from the server.
export const loginFormErrors = (state = {}, action) => {
    switch (action.type) {
        // on login failure populate the errors.
        case actions.login.LOGIN_FAILED : {
            return action.payload;
        }
        // on login success clear the form errors.
        case actions.login.LOGIN_SUCCESS : {
            return {};
        }
        // when the login modal is toggled, clear any form errors.
        case actions.ui.SHOW_LOGIN : {
            return {}
        }
        default:
            return state;
    }
};
