import thunk from 'redux-thunk';
import csrfFetch from './csrf';

const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
const RECEIVE_LISTING = 'RECEIVE_LISTING';

const receiveListings = (listings) => {
    return {
        type: RECEIVE_LISTINGS,
        listings
    };
};

const receiveListing = (listing) => {
    return {
        type: RECEIVE_LISTING,
        listing
    };
};

export const getListings = (store) => {
    if (store.listings) return Object.values(store.listings)
    return []
}

export const getListing = (listingId) => (store) => {
    if (store.listings && store.listings[listingId]) return store.listings[listingId]
    return null
}

export const fetchListings = () => async dispatch => {
    const response = await csrfFetch("/api/listings")
    if (response.ok) {
        console.log("in fetchlistings")
        const data = await response.json();
        console.log(data)
        dispatch(receiveListings(data));
    }
};

export const fetchListing = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListing(data.listing));
    }
};

export const createListing = (listing) => async dispatch => {
    const response = await csrfFetch("/api/listings",{
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListing(data.listing));
    }
}


const listingsReducer = (oldState={}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_LISTINGS:
            return {...newState, ...action.listings};

        case RECEIVE_LISTING:
            newState[action.listing.id] = action.listing
            return newState;
    
        default:
            return oldState;;
    }
}

export default listingsReducer

