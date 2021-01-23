import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/actions'
import { useEffect } from 'react'

function EditAccount(props) {

    useEffect(() => {
        if(!props.userObj){
            props.getUser(props.userId)
        }
    })
    return (
        <div className="edit-account">
            <h2>Edit Account</h2>
            {props.userObj ?
                <>
                    <h3 className="editable">username: @{props.userObj.username}</h3> <button>Edit</button>
                </>
                :
                <h3>Loading...</h3>
            }
            <NavLink to={`/my-profile`}>
                <h3>My Profile</h3>
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