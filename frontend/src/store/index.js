import session from "./session";
import { listingsReducer } from "./listings";
import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import { mapReducer } from "./map";
import errors from "./errors";

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const appReducer = combineReducers({
    errors,
    session,
    listings: listingsReducer,
    mapKey: mapReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'REMOVE_CURRENT_USER') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

const configureStore = (preloadedState ={})=> {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore