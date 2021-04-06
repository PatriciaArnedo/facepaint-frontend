import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import UserCard from '../account/UserCard'
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';


class UserContainer extends React.Component {

    
    state = {
        //default searchterm to apply filter function 
        searchTerm: ""
    }

    componentDidMount() {
        //makes call to API for users
        this.props.getUsers(this.props.userId)
    }

    renderUsers = () => {
        //excludes users with no filters
        let activeUsers = this.props.users.filter(user => user.filters.length > 0)
        //excludes current user from user set
        activeUsers = activeUsers.filter(user => user.id !== this.props.userId)
        //filters for any search terms
        const filteredUsers = activeUsers.filter(user => user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredUsers.map(userObj => <UserCard key={userObj.id} userObj={userObj} />)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-gallery">
                <div className="title-search">
                    <h1>Discover Artists</h1>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText name="searchTerm" value={this.state.searchTerm} onChange={this.searchOnChange} placeholder="Search Username" />
                    </span>
                </div>
                <Divider style={{ width: "1200px", margin: "0px 0px 30px 0px" }} />

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