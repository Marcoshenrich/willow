import thunk from 'redux-thunk';
import csrfFetch from './csrf';
import { searchErrors } from './errors';

const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
const RECEIVE_LISTING = 'RECEIVE_LISTING';
const CLEAR_LISTINGS = 'CLEAR_LISTINGS';
const RERENDER_LISTINGS = 'RERENDER_LISTINGS';

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


export const clearListings = () => {
    return {
        type: CLEAR_LISTINGS,
    };
};

export const rerenderListings = () => {
    return {
        type: RERENDER_LISTINGS
    };
};

export const getListings = (store) => {
    if (store.listings) return Object.values(store.listings)
    return []
}





export const getSortedListings = (options = { sortBy: "id", sortByLargestBool: true}) => (store) => {
    let listingArr;
    if (store.listings) {
        listingArr = Object.values(store.listings)
    } else {
        return []
    }

    var sortKey;
    if (options.sortBy === "Price") {
        if (options.sortByLargestBool) {
            return listingArr.sort((a, b) => (a.humanTeeth + a.stolenDreams + a.fairyDust) - (b.humanTeeth + b.stolenDreams + b.fairyDust))
        } else {
            return listingArr.sort((b, a) => (a.humanTeeth + a.stolenDreams + a.fairyDust) - (b.humanTeeth + b.stolenDreams + b.fairyDust))
        }

    } else if (options.sortBy === "Square Inches") {
        sortKey = "sqin";
    } else if (options.sortBy === "Number of Rooms") {
        sortKey = "numRooms";
    } else if (options.sortBy === "Number of Beds") {
        sortKey = "beds"
    } else if (options.sortBy === "Number of Hearths") {
        sortKey = "numFireplaces";
    } else {
        if (options.sortByLargestBool) {
            return listingArr.sort((b, a) => a.id - b.id)
        } else {
            return listingArr.sort((a, b) => a.id - b.id)
        }
    }

    if (options.sortByLargestBool) {
        return listingArr.sort((a, b) => a[sortKey] - b[sortKey])
    } else {
        return listingArr.sort((b, a) => a[sortKey] - b[sortKey])
    }

}

export const getListing = (listingId) => (store) => {
    if (store.listings && store.listings[listingId]) return store.listings[listingId]
    return null
}

export const fetchListings = () => async dispatch => {
    const response = await csrfFetch("/api/listings")
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListings(data));
    }
};

export const searchListings = (query) => async dispatch => {
    const response = await csrfFetch(`api/listings/search/${query}`)
    const data = await response.json();
    if (response.ok) {
        dispatch(receiveListings(data));
        return response;
    } else {
        dispatch(searchErrors(data))
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

        case CLEAR_LISTINGS:
            return {};


        case RERENDER_LISTINGS:
            return { ...newState };
    
        default:
            return oldState;;
    }

}

export default listingsReducer

