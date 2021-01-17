import { SIGN_UP, LOG_IN, LOG_OUT, POST_FILTER, GET_FILTERS } from './actionTypes'

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

export const getFilters = (userId) => {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/filters')
        .then(r => r.json())
        .then(arrayOfFilters => {
            const newArray = arrayOfFilters.filter(filter => filter.user.id === userId)
            console.log("got array of length:", newArray.length)
            dispatch( {type: GET_FILTERS, payload: newArray })
        })
    }
}
