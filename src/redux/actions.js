import { SIGN_UP, LOG_IN, LOG_OUT } from './actionTypes'

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
            .then(data => {
                if (data.id) {
                    console.log("found user", data.username)
                    localStorage.setItem("USER_DATA", JSON.stringify(data))
                    dispatch({ type: LOG_IN, payload: data })
                    window.reload()
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
    return { type: LOG_OUT }
}