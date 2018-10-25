import { combineReducers } from 'redux';
import productLocatorReducer from './productLocator-reducer';

const rootReducer = combineReducers({
  productLocator: productLocatorReducer,
});

export default rootReducer;