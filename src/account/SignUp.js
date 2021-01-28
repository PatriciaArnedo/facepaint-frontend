import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../redux/actions'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'


class SignUp extends React.Component {

  state = {
    username: "",
    name: "",
    password: ""
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.submitHandler(this.state)
    this.setState({
      username: "",
      name: "",
      password: ""
    })

  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Sign Up to facepaint</h3>
          <br />
          <form onSubmit={this.submitHandler}>
            <span className="p-float-label">
              <InputText
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.changeHandler}
              />
              <label htmlhtmlfor="in">Username</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.changeHandler}
              />
              <label htmlhtmlfor="in">Name</label>
            </span>
            <br />

            <span className="p-float-label">
              <InputText
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.changeHandler}
              />
              <label htmlhtmlfor="in">Password</label>
            </span>
            <br />

            <Button label="Sign Up" />
          </form>
          <br />
          <div>
          <Button onClick={this.props.cancelHandler} className="p-button-warning" label="Cancel" />
          </div>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return { submitHandler: (userObj) => dispatch(signUp(userObj)) }
}

export default connect(null, mapDispatchToProps)(SignUp)