import csrfFetch from './csrf';

const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const getUser = (userId) => (store) => {
    if (store.users && store.users[userId]) return store.users[userId]
    return null
}


export const fetchUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveUser(data.user));
    }
};

const userReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_USER:
            newState[action.user.id] = action.user
            return newState;

        default:
            return oldState;
    }
};

export default userReducer;