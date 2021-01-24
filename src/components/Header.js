import React from 'react'
import LogIn from '../account/LogIn'
import { logOut, logIn } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { setEventListnerEnabled, cameraShutdown } from '../camerafiles/FaceFilterSource'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

class Header extends React.Component {


    state = {
        items: [
            { label: 'Explore', icon: 'pi pi-fw pi-home', command: () => this.clickHandler("home")},
            { label: 'My Filters', icon: 'pi pi-fw pi-palette', command: () => this.clickHandler("gallery") },
            { label: 'Saved Filters', icon: 'pi pi-fw pi-bookmark', command: () => this.clickHandler("saved") },
            { label: 'Discover Artists', icon: 'pi pi-fw pi-eye', command: () => this.clickHandler("discover") },
        ],
      
    }

    //handles dummy auth by running login function on refresh
    componentDidMount = () => {
        this.props.submitHandler(undefined)
    }

    logOutHandler = () => {
        this.props.logOut()
        this.props.history.push("/welcome")
    }

    loggedInHandler = () => {

        //conditionally renders log out button and user greeting
        if (this.props.user) {
            return (
                <>
                    <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
                    <Button id="create-btn" className="p-button-rounded p-button-outlined" onClick={() => this.clickHandler("new")} icon="pi pi-pencil" label="New Filter"/>
                    <NavLink to={'/edit-account'} onClick={this.accountClickHandler}>
                        <h2 className="user-greeting">@{this.props.user}</h2>
                    </NavLink>
                    <Button id="logout-btn" className="button p-button-rounded" onClick={this.logOutHandler} label="Log Out" />
                </>
            )
        } else {
            return <LogIn />
        }
    }

    accountClickHandler = () => {
        cameraShutdown()
            .then(console.log("camera shut down"))
            .catch(console.log)
    }

    clickHandler = (string) => {
        //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
        //enables/disables drawing when user clicks
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
                    .then(console.log("camera shut down"))
                    .catch(console.log)
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
                    <h1 id="app-name">facepaint</h1>
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
