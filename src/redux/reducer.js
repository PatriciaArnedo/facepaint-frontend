import { SIGN_UP, LOG_IN, LOG_OUT, POST_FILTER, GET_FILTERS } from './actionTypes'
import { combineReducers } from 'redux'


const defaultState = {
    user: null,
    userId: 0,
    filters: []
}

function userReducer(currentState = defaultState.user, action) {
    switch (action.type) {
        case SIGN_UP:
            return action.payload.username
        case LOG_IN:
            return action.payload.username
        case LOG_OUT:
            return null
        default:
            return currentState
    }
}

function userIdReducer(currentState = defaultState.userId, action) {
    switch (action.type) {
        case SIGN_UP:
            return action.payload.id
        case LOG_IN:
            return action.payload.id
        case LOG_OUT:
            return 0
        default:
            return currentState
    }
}

function filterReducer(currentState = defaultState.filters, action) {
    switch (action.type) {
        case POST_FILTER:
            return [...currentState, action.payload]
        case GET_FILTERS:
            return action.payload
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    userId: userIdReducer,
    filters: filterReducer
})

export default rootReducer
