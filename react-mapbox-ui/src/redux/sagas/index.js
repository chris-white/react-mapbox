// A useful way to allow importing sagas from multiple files without too much effort.
import { all, fork } from 'redux-saga/effects';

// import sagas from a file
import * as someSagas from './sagas';

export default function* rootSaga(){
    yield all(
        [...Object.values(someSagas)].map(fork)
    );
}