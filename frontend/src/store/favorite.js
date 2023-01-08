import csrfFetch from './csrf';

const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const receiveFavorite= (favorite) => {
    return {
        type: RECEIVE_FAVORITE,
        favorite
    };
};

const receiveFavorites = (favorites) => {
    return {
        type: RECEIVE_FAVORITES,
        favorites
    };
};

const removeFavorite = (favoriteId) => {
    return {
        type: REMOVE_FAVORITE,
        favoriteId
    };
};

export const getFavorite = (favoriteId) => (store) => {
    if (store.favorites && store.favorites[favoriteId]) return store.favorites[favoriteId]
    return null
}

export const getFavorites = (store) => {
    if (store.favorites) return Object.values(store.favorites)
    return []
}

export const fetchFavorite = (favoriteId) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFavorite(data.favorite));
    }
};

export const fetchFavorites = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/favorites`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFavorites(data));
    }
};

export const deleteFavorite = (favoriteId) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeFavorite(favoriteId));
    }
};

export const createFavorite = (favorite) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/`, {
        method: "POST",
        body: JSON.stringify(favorite),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFavorite(data.favorite));
    }
}




const favoritesReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_FAVORITES:
            return { ...newState, ...action.favorites };

        case RECEIVE_FAVORITE:
            newState[action.favorite.id] = action.favorite
            return newState;


        case REMOVE_FAVORITE:
            delete newState[action.favoriteId]
            return newState;

        default:
            return oldState;
    }
};

export default favoritesReducer;