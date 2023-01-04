const LOGIN_ERRORS = 'LOGIN_ERRORS';
const SIGNUP_ERRORS = 'SIGNUP_ERRORS';
const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const loginErrors = (errors) => {
    return {
        type: LOGIN_ERRORS,
        errors
    };
};

export const signUpErrors = (errors) => {
    return {
        type: SIGNUP_ERRORS,
        errors
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};



const errorReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case LOGIN_ERRORS:
            newState["loginErrors"] = action.errors
            return newState

        case SIGNUP_ERRORS:
            newState["signUpErrors"] = action.errors
            return newState

        case CLEAR_ERRORS:
            return {}

        default:
            return oldState;;
    }
}

export default errorReducer
