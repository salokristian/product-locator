import { actionTypes } from '../constants';

const initialState = {
  account: null,
  stores: [],
};

export default function productLocatorReducer(state=initialState, action={}) {

  const { type, payload={} } = action;

  switch (type) {

  case actionTypes.SET_ACCOUNT: {
    const { account } = payload;
    return { ...state, account };
  }

  case actionTypes.SET_STORES: {
    const { stores } = payload;
    return {...state, stores };
  }

  default: return state;
  }

}