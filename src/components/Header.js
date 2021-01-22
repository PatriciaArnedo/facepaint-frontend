import React from 'react'
import LogIn from './LogIn'
import { logOut, logIn } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { setEventListnerEnabled, cameraShutdown } from '../FaceFilterLibrary/FaceFilterSource'

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
        if (this.props.user) {
            return (
                <>
                    <button onClick={() => this.clickHandler("new")} >Create Filter</button>
                    <button onClick={() => this.clickHandler("gallery")} >My Filters</button>
                    <button onClick={() => this.clickHandler("home")} >Explore Filters</button>
                    <button onClick={() => this.clickHandler("saved")} >Saved Filters</button>
                    <button onClick={() => this.clickHandler("discover")} >Discover Artists</button>
                    <h3 className="user-greeting">@{this.props.user}</h3>
                    <button id="logout-btn" className="button" onClick={this.logOutHandler}>Log Out</button>
                </>
            )
        } else {
            return <LogIn />
        }
    }

    clickHandler = (string) => {
        //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
        //enables/disables drawing when user clicks
        console.log(string)
        switch (string) {
            case "new":
                setEventListnerEnabled(true)
                this.props.history.push('/new-filter')
                break
            case "gallery":
                setEventListnerEnabled(false)
                this.props.history.push('/filter-gallery')
                break
            case "home":
                setEventListnerEnabled(false)
                this.props.history.push('/home')
                break
            case "saved":
                setEventListnerEnabled(false)
                this.props.history.push('/saved-filters')
                break
            case "discover":
                cameraShutdown()
                this.props.history.push('/discover-artists')
                break
            default:
                return
        }
    }


    render() {
        return (
            <div className="header">
                <NavLink to={this.props.user ? '/home' : '/welcome'}>
                    <h1 id="app-name">Face Paint</h1>
                </NavLink>
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

export default withRouter(connect(msp, mdp)(Header))


