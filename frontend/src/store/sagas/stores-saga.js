import { put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../constants';
import { getStoreList, getStoresByName } from './store-api';

function* fetchNearbyStores(action) {
  const { payload } = action;
  const { location } = payload;

  const storeList = yield getStoreList(location);
  console.log(storeList);


  yield put({
    type: actionTypes.SET_STORES,
    payload: {
      stores: storeList,
    },
  });
}

function* fetchStoresByName(action) {
  const { payload } = action;
  const { text } = payload;

  const storeList = yield getStoresByName(text);
  yield put({
    type: actionTypes.SET_STORES,
    payload: {
      stores: storeList,
    },
  });
}

export default function* storesSaga() {
  yield takeEvery(actionTypes.INIT_NEARBY_STORES_FETCH, fetchNearbyStores);
  yield takeEvery(actionTypes.INIT_STORES_FETCH_BY_NAME, fetchStoresByName);
}