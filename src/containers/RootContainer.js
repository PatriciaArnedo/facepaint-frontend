import React from 'react'
import MainContainer from './MainContainer'
import Header from '../components/Header'
import WelcomePage from '../components/WelcomePage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'



function RootContainer(props) {

    return (
        <div className="parent">
            <Header />

            <Switch>
                <Route path="/welcome" render={() => <WelcomePage />} />
                <Route path="/home" render={() => <MainContainer />} />
                <Route path="/new-filter" render={() => <MainContainer />} />
                <Route path="/filter-gallery" render={() => <MainContainer />} />
                {/* <Route path="/explore-filters" render={() => <MainContainer />} /> */}
                <Route path="/saved-filters" render={() => <MainContainer />} />

            </Switch>
            {props.user ? <Redirect to="/home" /> : <Redirect to="/welcome" />}

        </div>
    )

}

function msp(state) {
    return {
        user: state.user,
    }
}

export default (connect(msp)(RootContainer))