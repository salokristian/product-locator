import { actionTypes } from '../constants';

function setAccount(account) {
  return {
    type: actionTypes.SET_ACCOUNT,
    payload: {
      account,
    },
  };
}

function fetchNearbyStores(location) {
  return {
    type: actionTypes.INIT_NEARBY_STORES_FETCH,
    payload: {
      location,
    },
  };
}

function fetchByStoreName(text) {
  return {
    type: actionTypes.INIT_STORES_FETCH_BY_NAME,
    payload: {
      text,
    },
  };

}

export {
  setAccount,
  fetchNearbyStores,
  fetchByStoreName,
};