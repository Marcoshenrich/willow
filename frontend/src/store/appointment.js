import csrfFetch from './csrf';

const RECEIVE_APPOINTMENT = 'RECEIVE_APPOINTMENT';
const RECEIVE_APPOINTMENTS = 'RECEIVE_APPOINTMENTS';
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';

const receiveAppointment = (appointment) => {
    return {
        type: RECEIVE_APPOINTMENT,
        appointment
    };
};

const receiveAppointments = (appointments) => {
    return {
        type: RECEIVE_APPOINTMENTS,
        appointments
    };
};

const removeAppointment = (appointmentId) => {
    return {
        type: REMOVE_APPOINTMENT,
        appointmentId
    };
};

export const getAppointment = (apointmentId) => (store) => {
    if (store.appointments && store.appointments[apointmentId]) return store.appointments[apointmentId]
    return null
}

export const getAppointments = (store) => {
    if (store.appointments) return Object.values(store.appointments)
    return []
}

export const fetchAppointment = (apointmentId) => async dispatch => {
    const response = await csrfFetch(`/api/appointments/${apointmentId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveAppointment(data.appointment));
    }
};

export const fetchAppointments = () => async dispatch => {
    const response = await csrfFetch("/api/appointments")
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveAppointments(data));
    }
};

export const fetchUserAppointments = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/appointments/`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveAppointments(data));
    }
};

export const deleteAppointment = (appointmentId) => async dispatch => {
    const response = await csrfFetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeAppointment(appointmentId));
    }
};

export const createAppointment = (appointment) => async dispatch => {
    const response = await csrfFetch(`/api/appointments/`, {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveAppointment(data.appointment));
    }
}

export const updateAppointment = (appointment) => async dispatch => {
    const response = await csrfFetch(`/api/appointments/${appointment.id}`, {
        method: "PATCH",
        body: JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveAppointment(data.appointment));
    }
}




const appointmentsReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_APPOINTMENTS:
            return { ...newState, ...action.appointments };

        case RECEIVE_APPOINTMENT:
            newState[action.appointment.id] = action.appointment
            return newState;


        case REMOVE_APPOINTMENT:
            delete newState[action.appointmentId]
            return newState;

        default:
            return oldState;
    }
};

export default appointmentsReducer;