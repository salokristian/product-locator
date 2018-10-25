import { put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../constants';
import getList from './store-api';

function* fetchNearbyStores(action) {
  const { payload } = action;
  const { location } = payload;

  const storeList = yield getList(location);

  yield put({
    type: actionTypes.SET_NEARBY_STORES,
    payload: {
      stores: storeList,
    },
  });
}

export default function* storesSaga() {
  yield takeEvery(actionTypes.INIT_NEARBY_STORES_FETCH, fetchNearbyStores);
}