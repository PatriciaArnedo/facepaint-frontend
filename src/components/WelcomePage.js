import React from 'react'
import SignUp from './SignUp'

function WelcomePage (props) {

    return (
      <div className="welcome">
        <h1 id="welcome-text">Welcome to FacePaint</h1>
        <SignUp />
      </div>
    )

}

export default WelcomePage