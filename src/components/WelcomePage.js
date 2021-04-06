import React from 'react'
import SignUp from '../account/SignUp'
import { Button } from 'primereact/button';


class WelcomePage extends React.Component {

  state = {
    showModal: false
  }

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  render() {
    return (
      <div className="welcome">
        <div className="welcome-horizontal">
          <div className="welcome-set">
            <h1 className="welcome-text">Creating custom filters is easy and fun with facepaint</h1>
            <h1 className="welcome-subtext">A tool for drawing custom AR face filters</h1>
            <br />
            <Button onClick={this.modalHandler} className="button p-button-lg" label="Get Started" />
          </div>
          <img className="welcome-gif" src="https://i.imgur.com/6aFIUAh.gif" alt="gif of people smiling with drawinf on thwm" />
          {this.state.showModal ? <SignUp cancelHandler={this.modalHandler} /> : null}
        </div>
        <div>
        <p className="welcome-footer">
          powered by <a href="https://jeeliz.com">Jeeliz</a> and <a href="https://github.com/jakubfiala/atrament.js?utm_source=designernews">Atrament.js</a> 
        </p>
        </div>
      </div>
    )
  }

}

export default WelcomePage