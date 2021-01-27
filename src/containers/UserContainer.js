import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import UserCard from '../account/UserCard'
import { InputText } from 'primereact/inputtext';


class UserContainer extends React.Component {

    state = {
        searchTerm: ""
    }

    componentDidMount() {
        this.props.getUsers(this.props.userId)
    }

    renderUsers = () => {
        let activeUsers = this.props.users.filter(user => user.filters.length > 0)
        activeUsers = activeUsers.filter(user => user.id !== this.props.userId)
        const filteredUsers = activeUsers.filter(user => user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredUsers.map(userObj => <UserCard key={userObj.id} userObj={userObj} />)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-gallery">
                <h1>Discover Artists</h1>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText id="form-input" name="searchTerm" value={this.state.searchTerm} onChange={this.searchOnChange} placeholder="Search Username" />
                </span>
                {/* <input
                    id="form-input"
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.searchOnChange}
                    name="searchTerm"
                    placeholder="Search by Username"
                /> */}
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