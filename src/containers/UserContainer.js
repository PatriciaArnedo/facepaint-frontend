import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import UserCard from '../components/UserCard'


class UserContainer extends React.Component {


    componentDidMount (){
        this.props.getUsers(this.props.userId)
    }

    renderUsers = () => {
        return this.props.users.map(userObj => <UserCard  key={userObj.id} userObj={userObj} />)
    }

    render(){
        return(
            <div className="user-gallery">
                <h1>Discover Artists</h1>
                <div className="user-container">
                {this.renderUsers()}
                </div>
            </div>
        )
    }

}

function msp(state){
    return{
        users: state.users,
        userId:state.userId
    }
}

function mdp(dispatch){
return {
        getUsers: (userId) => dispatch(getUsers(userId)),
    }
}

export default connect(msp,mdp)(UserContainer)