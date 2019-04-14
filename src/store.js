import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    products: productReducer
});

const middleware = [thunk];

const store = createStore(allReducers, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;