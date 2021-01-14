import React from 'react'
import MainContainer from './MainContainer'
import Header from '../components/Header'



function RootContainer() {


    return (
        <div className="parent">
        <Header />
        <MainContainer />
        </div>
    )

}

export default RootContainer