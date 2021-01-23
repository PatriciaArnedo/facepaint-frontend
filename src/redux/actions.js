import { SIGN_UP, LOG_IN, LOG_OUT, POST_FILTER, GET_USER_FILTERS, GET_SAVED_FILTERS, GET_ALL_FILTERS, DELETE_USER_FILTER, DELETE_SAVED_FILTER, SAVE_FILTER, GET_USERS, GET_USER} from './actionTypes'

export const signUp = (userObj) => {
    return function (dispatch) {
        fetch("http://localhost:3000/api/v1/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then(data => {
                if (data.id) {
                    console.log("succesfully created user", data.username)
                    localStorage.setItem("USER_DATA", JSON.stringify(data))
                    dispatch({ type: SIGN_UP, payload: data })
                } else {
                    console.log("user sign up failed")
                    window.alert("Please Enter a Username and Password")
                }
            })
            .catch(console.log)
    }
}


export const logIn = (userObj) => {
    return function (dispatch) {
        if (userObj === undefined) {
            const userDataStr = localStorage.getItem("USER_DATA")
            let userDataObj = JSON.parse(userDataStr)
            if (userDataObj) {
                console.log("user data from local storage", userDataObj)
                dispatch({ type: LOG_IN, payload: userDataObj })
            }
            return
        }

        fetch(`http://localhost:3000/api/v1/users/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application.json"
            },
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then(newUserObj => {
                if (newUserObj.id) {
                    console.log("found user", newUserObj.username)
                    localStorage.setItem("USER_DATA", JSON.stringify(newUserObj))
                    dispatch({ type: LOG_IN, payload: newUserObj })
                } else {
                    console.log("user not found")
                    window.alert("Wrong Username or Password Please Try Again")
                }
            })
            .catch(console.log)
    }
}

export const logOut = () => {
    localStorage.removeItem("USER_DATA")
    window.location.reload()
    return { type: LOG_OUT }
}

export const postFilter = (filterObj) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/filters', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accepts":"application.json"
            },
            body: JSON.stringify(filterObj)
        })
        .then(r => r.json)
        .then(newFilterObj => {
            if(newFilterObj.id){
                console.log("Succesfully created filter", newFilterObj)
                dispatch({ type: POST_FILTER, payload: newFilterObj})
            }
        })
        .catch(console.log)
    }
}

export const getUserFilters = (userId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/filters')
        .then(r => r.json())
        .then(arrayOfFilters => {
            const newArray = arrayOfFilters.filter(filter => filter.user.id === userId)
            console.log("got array of length:", newArray.length)
            dispatch( {type: GET_USER_FILTERS, payload: newArray })
        })
    }
}

export const getAllFilters = (userId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/filters')
        .then(r => r.json())
        .then(arrayOfFilters => {
            const newArray = arrayOfFilters.filter(filter => filter.user.id !== userId)
            console.log("got array of length:", newArray.length)
            dispatch( {type: GET_ALL_FILTERS, payload: newArray })
        })
    }
}

export const getSavedFilters = (userId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/save_filters')
        .then(r => r.json())
        .then(arrayOfFilters => {
            const newArray = arrayOfFilters.filter(filter => filter.user_id === userId)
            console.log("got array of length:", newArray.length)
            dispatch( {type: GET_SAVED_FILTERS, payload: newArray })
        })
    }
}

export const deleteFilter = (filterId) => {
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/filters/${filterId}`,{
            method: "DELETE"
        })
        .then(r => r.json())
        .then(dispatch({type: DELETE_USER_FILTER, payload: filterId}))
        .catch(console.log)
    }
}

export const deleteSavedFilter = (SaveId) => {
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/save_filters/${SaveId}`,{
            method: "DELETE"
        })
        .then(r => r.json())
        .then(dispatch({type: DELETE_SAVED_FILTER, payload: SaveId}))
        .catch(console.log)
    }
}

export const saveFilter = (saveObj) => {
    return function(dispatch) {
        fetch("http://localhost:3000/api/v1/save_filters",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Accepts":"application/json"
            },
            body: JSON.stringify(saveObj)
        })
        .then(r => r.json())
        .then(newSaveObj => {
            if (newSaveObj.id){
                dispatch({type: SAVE_FILTER, payload: newSaveObj})
                window.alert("Filter added to your saved filters.")
            } else {
                window.alert("You already saved this filter.")
            }
        })
        .catch(console.log)
    }
}

export const getUsers = (userId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/users')
        .then(r => r.json())
        .then(arrayOfUsers => {
            const newArray = arrayOfUsers.filter(user => user.id !== userId)
            dispatch( {type: GET_USERS, payload: newArray })
        })
    }
}

export const getUser = (userId) => {
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/users/${userId}`)
        .then(r => r.json())
        .then(userObj => {
            dispatch( {type: GET_USER, payload: userObj })
        })
    }
}