import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../redux/actions'
import EditAccountForm from './EditAccountForm'


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
                            <h4 className="editable">username: @{this.props.userObj.username}</h4>
                            <EditAccountForm clickHandler={this.clickHandler}/>
                            <br />
                            <br />
                            <button onClick={this.clickHandler}>{this.state.beenClicked ? "Cancel" : "Edit"}</button>

                        </>
                        :
                        <>
                            <h4 className="editable">username: @{this.props.userObj.username}</h4>
                            <h4 className="editable">name: {this.props.userObj.name}</h4>
                            <h4 className="editable">instagram: {this.props.userObj.instagram}</h4>
                            <h4 className="editable">bio: {this.props.userObj.bio}</h4>
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