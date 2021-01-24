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
      <div>
        <div>
          <form onSubmit={this.submitHandler}>
            <span className="p-float-label">
              <InputText
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.changeHandler}
              />
              <label htmlhtmlFor="in">Username</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.changeHandler}
              />
              <label htmlhtmlFor="in">Name</label>
            </span>
            <br />

            <span className="p-float-label">
              <InputText
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.changeHandler}
              />
              <label htmlhtmlFor="in">Password</label>
            </span>
            <br />

            <Button label="Sign Up" />
          </form>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return { submitHandler: (userObj) => dispatch(signUp(userObj)) }
}

export default connect(null, mapDispatchToProps)(SignUp)