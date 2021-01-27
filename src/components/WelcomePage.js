import React from 'react'
import SignUp from '../account/SignUp'
import { Button } from 'primereact/button';


class WelcomePage extends React.Component {

  state = {
    showModal: false
  }

  modalHandler = () => {
    this.setState({showModal: !this.state.showModal})
  }
  render() {
    return (
      <div className="welcome">
        <h1 id="welcome-text">welcome to facepaint</h1>
        {this.state.showModal ? <SignUp cancelHandler={this.modalHandler}/> : null }
        <Button onClick={this.modalHandler} className="p-button-rounded" label="Get Started"/>
      </div>
    )
  }

}

export default WelcomePage