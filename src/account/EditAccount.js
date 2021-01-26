import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../redux/actions'
import EditAccountForm from './EditAccountForm'
import ImageUpload from './ImageUpload'


class EditAccount extends React.Component {

    state = {
        beenClicked: false,
    }

    componentDidMount() {
        if (!this.props.userObj.username && this.props.userId) {
            this.props.getUser(this.props.userId)
        }
    }

    clickHandler = () => {
        this.setState({ beenClicked: !this.state.beenClicked })
    }



    render() {
        return (
            <div className="edit-account">
                <h2>Edit Account</h2>
                {this.props.userObj.username ?
                    this.state.beenClicked ?
                        <>
                            <p className="editable">username: @{this.props.userObj.username}</p>
                            <EditAccountForm clickHandler={this.clickHandler}/>
                            <br />
                            <br />
                            <button onClick={this.clickHandler}>{this.state.beenClicked ? "Cancel" : "Edit"}</button>

                        </>
                        :
                        <>
                            <p className="editable">username: @{this.props.userObj.username}</p>
                            <p className="editable">name: {this.props.userObj.name}</p>
                            <p className="editable">instagram: {this.props.userObj.instagram}</p>
                            <p className="editable">bio: {this.props.userObj.bio}</p>
                            <button onClick={this.clickHandler}>{this.state.beenClicked ? "Cancel" : "Edit"}</button>
                        </>
                    :
                    <h3>Loading...</h3>
                }
                <br />
                <br />
                <NavLink to={`/my-profile`}>
                    <h3>View My Profile</h3>
                </NavLink>
                <br />
                <ImageUpload />
            </div>
        )
    }
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
        updateUser: (userObj, userId) => dispatch(updateUser(userObj, userId)),
        getUser: (userId) => dispatch(getUser(userId))
    }
}

export default connect(msp, mdp)(EditAccount)