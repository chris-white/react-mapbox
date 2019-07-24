import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from "../actionTypes";

import { findAddress, findAddressByPlaceId } from '../../service/SearchService';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* selectParcelAsync(action) {
    let data = yield findAddressByPlaceId(action.payload.placeId, action.payload.searchToken);

    if (!data.error) {
        yield put({type: actions.UPDATE_SEARCH_TOKEN, payload: {tokenUUID: data.tokenUUID}});
        yield put({type: actions.UPDATE_SELECTED_ADDRESS_DETAILS, payload: data.details});
    }
}

export function* watchSelectParcelAsync() {
    yield takeEvery(actions.SELECT_ADDRESS, selectParcelAsync);
}

function* searchUpdatedAsync(action) {
    console.log("searchUpdatedAsync");
    yield delay(1000);

    let data = yield findAddress(action.payload.searchTerm, action.payload.searchToken, action.payload.userLocation);

    if (!data.error) {
        yield put({type: actions.UPDATE_SEARCH_TOKEN, payload: {tokenUUID: data.tokenUUID}});
        yield put({type: actions.UPDATE_SEARCH_RESULTS, payload: {searchResults: data.results}});
    }
}

export function* watchSearchUpdatedAsync() {
    yield takeLatest(actions.SEARCH_UPDATED, searchUpdatedAsync);
}