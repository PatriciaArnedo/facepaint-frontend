import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../redux/actions'

class SignUp extends React.Component {

  state = {
    username: "",
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
      password: ""
    })

  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              value={this.state.username}
              name={"username"}
              onChange={this.changeHandler}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.changeHandler}
              placeholder="Password"
            />
            <button>Sign Up</button>
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