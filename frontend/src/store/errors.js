const LOGIN_ERRORS = 'LOGIN_ERRORS';
const SIGNUP_ERRORS = 'SIGNUP_ERRORS';

export const loginErrors = (errors) => {
    return {
        type: LOGIN_ERRORS,
        errors
    };
};

export const signupErrors = (errors) => {
    return {
        type: SIGNUP_ERRORS,
        errors
    };
};


export const errorReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case LOGIN_ERRORS:
            newState["LOGIN_ERRORS"] = action.errors
            console.log(newState)
            return newState

        case SIGNUP_ERRORS:
            newState["SIGNUP_ERRORS"] = action.errors
            return newState

        default:
            return oldState;;
    }
}

