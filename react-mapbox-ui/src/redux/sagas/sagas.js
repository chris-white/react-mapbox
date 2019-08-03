import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from "../actionTypes";

import { findAddress, findAddressByPlaceId } from '../../service/SearchService';
import { login } from '../../service/LoginService';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* selectParcelAsync(action) {
    let data = yield findAddressByPlaceId(action.payload.placeId, action.payload.searchToken);

    if (!data.error) {
        yield put({type: actions.search.UPDATE_SEARCH_TOKEN, payload: {tokenUUID: data.tokenUUID}});
        yield put({type: actions.search.UPDATE_SELECTED_ADDRESS_DETAILS, payload: data.details});
    }
}

export function* watchSelectParcelAsync() {
    yield takeEvery(actions.search.SELECT_ADDRESS, selectParcelAsync);
}

function* searchUpdatedAsync(action) {
    yield delay(1000);

    let data = yield findAddress(action.payload.searchTerm, action.payload.searchToken, action.payload.userLocation, action.payload.auth);

    if (!data.error) {
        yield put({type: actions.search.UPDATE_SEARCH_TOKEN, payload: {tokenUUID: data.tokenUUID}});
        yield put({type: actions.search.UPDATE_SEARCH_RESULTS, payload: {searchResults: data.results}});
    }
}

export function* watchSearchUpdatedAsync() {
    yield takeLatest(actions.search.SEARCH_UPDATED, searchUpdatedAsync);
}

function* loginAsync(action) {

    let data = yield login(action.payload.username, action.payload.password);

    if (!data.error)
    {
        yield put({type: actions.login.LOGIN_SUCCESS, payload: data});
    }else {
        yield put({type: actions.login.LOGIN_FAILED, payload: data});
    }

}

export function* watchLoginAsync() {
    yield takeLatest(actions.login.LOGIN, loginAsync);
}
