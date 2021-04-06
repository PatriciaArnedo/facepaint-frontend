import React from 'react'
import LogIn from '../account/LogIn'
import { logOut, logIn, getUser } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { setEventListnerEnabled, cameraShutdown } from '../camerafiles/FaceFilterSource'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';


class Header extends React.Component {


    state = {
        items: [
            { label: 'Explore', icon: 'pi pi-fw pi-home', command: () => this.clickHandler("home") },
            { label: 'My Filters', icon: 'pi pi-fw pi-palette', command: () => this.clickHandler("gallery") },
            { label: 'Saved Filters', icon: 'pi pi-fw pi-bookmark', command: () => this.clickHandler("saved") },
            { label: 'Discover Artists', icon: 'pi pi-fw pi-eye', command: () => this.clickHandler("discover") },
        ],
        showModal: false
    }

    //handles dummy auth by running login function on refresh
    componentDidMount = () => {
        this.props.submitHandler(undefined)
    }

    logOutHandler = () => {
        this.props.logOut()
        this.props.history.push("/welcome")
        this.setState({ showModal: false })
    }

    avatarOnClick = () => {
        this.props.history.push('/edit-account')
        cameraShutdown()
        .then(console.log("camera shut down"))
        .catch(console.log)
    }

    tabHandler = (e) => {
        this.setState({ activeItem: e.value })
    }

    loggedInHandler = () => {

        //conditionally renders log out button and user greeting
        if (this.props.user) {
            return (
                <>
                    <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={this.tabHandler} />
                    <Button id="create-btn" className="p-button-rounded p-button-outlined" onClick={() => this.clickHandler("new")} icon="pi pi-pencil" label="New Filter" />
                    <img onClick={this.avatarOnClick} className="header-avatar" src={this.props.userObj.avatar ? this.props.userObj.avatar : "https://i.imgur.com/igyvLpE.jpg"} alt="user avatar"/>
                    <Button id="logout-btn" className="button p-button-rounded" onClick={this.logOutHandler} label="Log Out" />
                </>
            )
        } else {
            return <Button id="login-btn" className="button p-button" onClick={this.logInHandler} label="Log In" />
        }
    }

    logInHandler = () => {
        this.setState({ showModal: !this.state.showModal })
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

    appNameClicker = () => {
        if (this.props.user){
            this.props.history.push('/home')
        } else {
            this.props.history.push('/welcome')
        }
    }


    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <img onClick={this.appNameClicker} className="app-name" src="https://i.imgur.com/9g07Wkk.png" alt="facepaint written in colorful letters"/>

                    {this.loggedInHandler()}
                    <br />
                </div>
                <Divider style={{ marginTop: "-11px", width:"auto" }} />
                {this.state.showModal ?
                    <LogIn cancelHandler={this.logInHandler}/>
                    :
                    null
                }
            </div>
        )
    }

}


const msp = (state) => {
    return { 
        user: state.user,
        userObj: state.userObj,
        userId: state.userId
    }
}

const mdp = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    submitHandler: (userObj) => dispatch(logIn(userObj)),
    getUser: (userId) => dispatch(getUser(userId))
})

export default withRouter(connect(msp, mdp)(Header))
