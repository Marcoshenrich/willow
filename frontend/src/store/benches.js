import thunk from 'redux-thunk';
import csrfFetch from './csrf';

const RECEIVE_BENCHES = 'benches/receiveBenches';
const RECEIVE_BENCH = 'benches/receiveBench';

const receiveBenches = (benches) => {
    return {
        type: RECEIVE_BENCHES,
        benches
    };
};

const receiveBench = (bench) => {
    return {
        type: RECEIVE_BENCH,
        bench
    };
};

export const getBenches = (store) => {
    if (store.benches) return Object.values(store.benches)
    return []
}

export const fetchBenches = () => async dispatch => {
    const response = await csrfFetch("/api/benches")
    if (response.ok) {
        const benches = await response.json();
        dispatch(receiveBenches(benches));
    }
};

export const createBench = (bench) => async dispatch => {
    const response = await csrfFetch("/api/benches",{
        method: "POST",
        body: JSON.stringify(bench),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveBench(data));
    }
}


export const benchReducer = (oldState={}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_BENCHES:
            return {...newState, ...action.benches};

        case RECEIVE_BENCH:
            newState[action.bench.id] = action.bench
            return newState;
    
        default:
            return oldState;;
    }
}

