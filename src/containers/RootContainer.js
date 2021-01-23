import React from 'react'
import MainContainer from './MainContainer'
import Header from '../components/Header'
import WelcomePage from '../components/WelcomePage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserProfile from '../account/UserProfile'
import EditAccount from '../account/EditAccount'



function RootContainer(props) {

    return (
        <div className="parent">
            <Header />

            <Switch>
                <Route path="/welcome" render={() => <WelcomePage />} />
                <Route path="/home" render={() => <MainContainer />} />
                <Route path="/new-filter" render={() => <MainContainer />} />
                <Route path="/filter-gallery" render={() => <MainContainer />} />
                <Route path="/discover-artists" render={() => <MainContainer />} />
                <Route path="/saved-filters" render={() => <MainContainer />} />
                <Route path="/edit-account" render={() => <EditAccount />} />
                <Route path='/user/:id' render={({ match }) => {
                    let userId = parseInt(match.params.id)
                    let foundUser = props.users.find(user => user.id === userId)
                    return (
                        <>
                            {props.users.length === 0 ? <h1>Loading....</h1>
                                :
                                <UserProfile userObj={foundUser} />
                            }
                        </>
                    )
                }} />
                <Route path='/my-profile/' render={() => {
                    return (
                        <>
                            {props.userObj ? <UserProfile userObj={props.userObj} />
                                :
                                <h1>Loading....</h1>
                            }
                        </>
                    )
                }} />

            </Switch>
            {props.user ? <Redirect to="/home" /> : <Redirect to="/welcome" />}

        </div>
    )
}

function msp(state) {
    return {
        user: state.user,
        users: state.users,
        userId: state.userId,
        userObj: state.userObj
    }
}



export default (connect(msp)(RootContainer))