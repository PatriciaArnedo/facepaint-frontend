import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/actions'
import { useEffect } from 'react'

function EditAccount(props) {

    useEffect(() => {
        if(!props.userObj){
            props.getUser(props.userId)
        } else {
            console.log("userObj in edit account",props.userObj)
        }
    })
    return (
        <div className="edit-account">
            <h2>Edit Account</h2>
            {props.userObj ?
                <>
                    <h4 className="editable">username: @{props.userObj.username}</h4> 
                    <h4 className="editable">name: {props.userObj.name}</h4> 
                    <h4 className="editable">instagram: {props.userObj.instagram}</h4> 
                    <h4 className="editable">bio: {props.userObj.bio}</h4> 
                    <button>Edit</button>
                </>
                :
                <h3>Loading...</h3>
            }
            <NavLink to={`/my-profile`}>
                <h3>View My Profile</h3>
            </NavLink>
        </div>
    )
}

function msp(state) {
    return {
        user: state.user,
        userId: state.userId,
        userObj: state.userObj
    }
}

function mdp(dispatch) {
    return {
        getUser: (userId) => dispatch(getUser(userId))
    }
}

export default connect(msp, mdp)(EditAccount)