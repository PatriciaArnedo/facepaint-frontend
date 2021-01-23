import React from 'react'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../redux/actions'

class EditAccountForm extends React.Component {

    state = {
        name: this.props.userObj.name,
        instagram: this.props.userObj.instagram,
        bio: this.props.userObj.bio,
    }

    componentDidMount() {
        if (!this.props.userObj.username && this.props.userId) {
            this.props.getUser(this.props.userId)
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.updateUser(this.state, this.props.userId)
        this.props.clickHandler()
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="edit-account">
                            <form onSubmit={this.submitHandler}>
                                <br />
                                <br />
                                <input
                                    type="text"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.changeHandler}
                                    placeholder="Name"
                                />
                                <br />
                                <br />
                                <input
                                    type="text"
                                    value={this.state.instagram}
                                    name="instagram"
                                    onChange={this.changeHandler}
                                    placeholder="Instagram"
                                />
                                <br />
                                <br />
                                <textarea
                                    value={this.state.bio}
                                    name="bio"
                                    onChange={this.changeHandler}
                                    placeholder="Bio"
                                />
                                <br />
                                <br />
                                <button>Update</button>
                            </form>
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

export default connect(msp, mdp)(EditAccountForm)