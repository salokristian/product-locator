import { fork } from 'redux-saga/effects';
import storesSaga from './stores-saga';

function* rootSaga() {
  yield fork(storesSaga);
}

export default rootSaga;