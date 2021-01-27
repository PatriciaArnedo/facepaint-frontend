import {
    SIGN_UP, LOG_IN, LOG_OUT, POST_FILTER, GET_USER_FILTERS, GET_SAVED_FILTERS,
    GET_ALL_FILTERS, DELETE_USER_FILTER, DELETE_SAVED_FILTER, GET_USERS,
    GET_USER, UPDATE_USER, UPLOAD_AVATAR, SAVE_FILTER
} from './actionTypes'
import { combineReducers } from 'redux'


const defaultState = {
    user: null,
    userId: null,
    userFilters: [],
    allFilters: [],
    savedFilters: [],
    users: [],
    userObj: {
        avatar: "",
        username: "",
        name: "",
        instagram: "",
        bio: "",
    }
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

function userFilterReducer(currentState = defaultState.userFilters, action) {
    switch (action.type) {
        case POST_FILTER:
            return [...currentState, action.payload]
        case GET_USER_FILTERS:
            return action.payload
        case DELETE_USER_FILTER:
            return currentState.filter(filter => filter.id !== action.payload)
        default:
            return currentState
    }
}

function allFilterReducer(currentState = defaultState.allFilters, action) {
    switch (action.type) {
        case GET_ALL_FILTERS:
            return action.payload
        case SAVE_FILTER:
            return currentState.map(filter => {
                if (action.payload.filter_id !== filter.id) {
                    return filter
                }
                const newFilter = JSON.parse(JSON.stringify(filter))

                newFilter.save_count++
                return newFilter
            })
        default:
            return currentState
    }
}

function savedFilterReducer(currentState = defaultState.savedFilters, action) {
    switch (action.type) {
        case GET_SAVED_FILTERS:
            return action.payload
        case DELETE_SAVED_FILTER:
            return currentState.filter(savedFilter => savedFilter.id !== action.payload)
        default:
            return currentState
    }
}

function usersReducer(currentState = defaultState.users, action) {
    switch (action.type) {
        case GET_USERS:
            return action.payload
        case UPDATE_USER:
            return currentState.map(userObj => userObj.id === action.payload.id ? action.payload : userObj)
        default:
            return currentState
    }
}

function userObjReducer(currentState = defaultState.userObj, action) {
    switch (action.type) {
        case LOG_IN:
            return action.payload
        case GET_USER:
            return action.payload
        case UPDATE_USER:
            return action.payload
        case UPLOAD_AVATAR:
            return action.payload
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    userId: userIdReducer,
    userFilters: userFilterReducer,
    allFilters: allFilterReducer,
    savedFilters: savedFilterReducer,
    users: usersReducer,
    userObj: userObjReducer
})

export default rootReducer
