import session from "./session";
import { benchReducer } from "./benches";
import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import { mapReducer } from "./map";
import { errorReducer } from "./errors";

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
    errorReducer,
    session,
    "mapKey": mapReducer
})

const configureStore = (preloadedState ={})=> {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore