/* Redux action creators */
import * as actions from "./actionTypes";

export const selectAddress = (placeId, searchToken) => ({
    type: actions.SELECT_ADDRESS,
    payload: {placeId, searchToken}
});

export const searchUpdated = (searchTerm, searchToken, userLocation) => ({
    type: actions.SEARCH_UPDATED,
    payload: {searchTerm, searchToken, userLocation}
});

export const setUserLocation = (userLocation) => ({
    type: actions.SET_USER_LOCATION,
    payload: userLocation
});

export const login = (loginFormData) => ({
    type: actions.LOGIN,
    payload: loginFormData
});

export const toggleMenu = (toggleMenu) => ({
    type: actions.TOGGLE_MENU,
    payload: toggleMenu
});

export const showLogin = (showLogin) => ({
    type: actions.SHOW_LOGIN,
    payload: showLogin
});
