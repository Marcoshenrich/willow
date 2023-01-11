import csrfFetch from './csrf';

const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
const REMOVE_REVIEW = 'REMOVE_REVIEW';

const receiveReview = (review) => {
    return {
        type: RECEIVE_REVIEW,
        review
    };
};

const receiveReviews = (reviews) => {
    return {
        type: RECEIVE_REVIEWS,
        reviews
    };
};

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    };
};

export const getReview = (reviewId) => (store) => {
    if (store.reviews && store.reviews[reviewId]) return store.reviews[reviewId]
    return null
}

export const getReviews = (store) => {
    if (store.reviews) return Object.values(store.reviews)
    return []
}

export const fetchReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReview(data.review));
    }
};

export const fetchReviews = () => async dispatch => {
    const response = await csrfFetch("/api/reviews")
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReviews(data));
    }
};

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

export const createReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReview(data.review));
    }
}

export const updateReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReview(data.review));
    }
}




const reviewsReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return { ...newState, ...action.reviews };

        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review
            return newState;

        case REMOVE_REVIEW:
            delete newState[action.review.id]
            return newState;

        default:
            return oldState;
    }
};

export default reviewsReducer;