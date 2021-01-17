import React from 'react'
import LogIn from './LogIn'
import { logOut, logIn } from '../redux/actions'
import { connect } from 'react-redux'


class Header extends React.Component {



    //handles dummy auth by running login function on refresh
    componentDidMount = () => {
        this.props.submitHandler(undefined)
    }

    logOutHandler = () => {
        this.props.logOut()
    }

    loggedInHandler = () => {
        //conditionally renders log out button and user greeting
        if(this.props.user){
            return (
                <>
                <h3 className="user-greeting">Hi {this.props.user}</h3>
                <button id="logout-btn" className="button" onClick={this.logOutHandler}>Log Out</button>
                </>
            )
        } else {
            return <LogIn />
        }
    }

    render() {
        return (
            <div className="header">
                <h1 id="app-name">FacePaint</h1>
                {this.loggedInHandler()}
            </div>
        )
    }

}

const msp = (state) => {
    return { user: state.user }
}

const mdp = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    submitHandler: (userObj) => dispatch(logIn(userObj))
})

export default connect(msp, mdp)(Header)