/* Redux action creators */
import * as actions from "./actionTypes";

export const selectAddress = (placeId, searchToken) => ({
    type: actions.search.SELECT_ADDRESS,
    payload: {placeId, searchToken}
});

export const searchUpdated = (searchTerm, searchToken, userLocation) => ({
    type: actions.search.SEARCH_UPDATED,
    payload: {searchTerm, searchToken, userLocation}
});

export const setUserLocation = (userLocation) => ({
    type: actions.search.SET_USER_LOCATION,
    payload: userLocation
});

export const login = (loginFormData) => ({
    type: actions.login.LOGIN,
    payload: loginFormData
});

export const logout = () => ({
    type: actions.login.LOGOUT
});

export const loginSuccess = (loginData) => ({
    type: actions.login.LOGIN_SUCCESS,
    payload: loginData
});

export const loginFailed = (loginData) => ({
    type: actions.login.LOGIN_FAILED,
    payload: loginData
});

export const toggleMenu = (toggleMenu) => ({
    type: actions.ui.TOGGLE_MENU,
    payload: toggleMenu
});

export const showLogin = (showLogin) => ({
    type: actions.ui.SHOW_LOGIN,
    payload: showLogin
});
