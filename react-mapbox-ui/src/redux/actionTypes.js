/* Constants representing Redux action types*/


// Search input updates
/*
export const SEARCH_UPDATED = "SEARCH_UPDATED";
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS";

export const SELECT_ADDRESS = "SELECT_ADDRESS";
export const UPDATE_SELECTED_ADDRESS_DETAILS = "UPDATE_SELECTED_ADDRESS_DETAILS";

// Google Places API Tokens
export const UPDATE_SEARCH_TOKEN = "UPDATE_SEARCH_TOKEN";
export const SET_USER_LOCATION = "SET_USER_LOCATION";

export const TOGGLE_MENU = "TOGGLE_MENU";
export const SHOW_LOGIN = "SHOW_LOGIN";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
*/

// actions related to search input changes, selecting an address and setting up google api properties / tokens
export const search = {
    SEARCH_UPDATED : "SEARCH_UPDATED",
    UPDATE_SEARCH_RESULTS : "UPDATE_SEARCH_RESULTS",
    SELECT_ADDRESS : "SELECT_ADDRESS",
    UPDATE_SELECTED_ADDRESS_DETAILS : "UPDATE_SELECTED_ADDRESS_DETAILS",
    UPDATE_SEARCH_TOKEN : "UPDATE_SEARCH_TOKEN",
    SET_USER_LOCATION : "SET_USER_LOCATION"
}

// actions to control properties of the UI.
export const ui = {
    TOGGLE_MENU : "TOGGLE_MENU",
    SHOW_LOGIN : "SHOW_LOGIN"
}

// actions relating to the login process
export const login = {
    LOGIN : "LOGIN",
    LOGOUT : "LOGOUT",
    LOGIN_SUCCESS : "LOGIN_SUCCESS",
    LOGIN_FAILED : "LOGIN_FAILED"
}
