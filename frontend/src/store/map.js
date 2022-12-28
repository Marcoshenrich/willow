import thunk from 'redux-thunk';
import csrfFetch from './csrf';

const RECEIVE_MAP_KEY = 'maps/receiveKey';

const receiveMapKey = (key) => {
    return {
        type: RECEIVE_MAP_KEY,
        key
    };
};

export const getMapKey = (store) => {
    if (store.mapKey) return store.mapKey
    return null
}

export const fetchMapKey = () => async dispatch => {
    const response = await csrfFetch("/api/map")
    if (response.ok) {
        const key = await response.json();
        dispatch(receiveMapKey(key));
    }
};


export const mapReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_MAP_KEY:
            return { ...newState, ...action.key };

        default:
            return oldState;;
    }
}

