import { SIGN_UP, LOG_IN, LOG_OUT } from './actionTypes'
import { combineReducers } from 'redux'


const defaultState = {
    user: null,
    userId: 0
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

const rootReducer = combineReducers({
    user: userReducer,
    userId: userIdReducer
})

export default rootReducer
