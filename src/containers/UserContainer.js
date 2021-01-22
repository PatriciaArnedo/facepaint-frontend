import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import UserCard from '../components/UserCard'


class UserContainer extends React.Component {

    state = {
        searchTerm: ""
    }

    componentDidMount() {
        this.props.getUsers(this.props.userId)
    }

    renderUsers = () => {
        const filteredUsers = this.props.users.filter(user => user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredUsers.map(userObj => <UserCard key={userObj.id} userObj={userObj} />)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-gallery">
                <h1>Discover Artists</h1>
                <input
                    id="form-input"
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.searchOnChange}
                    name="searchTerm"
                    placeholder="Search by Username"
                />
                <div className="user-container">
                    {this.renderUsers()}
                </div>
            </div>
        )
    }

}

function msp(state) {
    return {
        users: state.users,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getUsers: (userId) => dispatch(getUsers(userId)),
    }
}

export default connect(msp, mdp)(UserContainer)