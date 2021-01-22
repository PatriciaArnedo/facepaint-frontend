import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions'
import UserCard from '../components/UserCard'


class UserContainer extends React.Component {


    componentDidMount (){
        this.props.getUsers()
    }

    renderUsers = () => {
        this.props.users.map(userObj => <UserCard  key={userObj.id} userObj={userObj} />)
    }

    render(){
        return(
            <div className="user-gallery">
                <h1>Discover Artists</h1>
            </div>
        )
    }

}

function msp(state){
    return{
        users: state.users
    }
}

function mdp(dispatch){
return {
        getUsers: () => dispatch(getUsers()),
    }
}

export default connect(msp,mdp)(UserContainer)