import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../redux/actions'



class LogIn extends React.Component {

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
                    <form id="login-form" onSubmit={this.submitHandler}>

                        <input
                            type="text"
                            value={this.state.username}
                            name="username"
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
                        <button>Log In</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mdp = (dispatch) => {
    return {
        submitHandler: (userObj) => dispatch(logIn(userObj))
    }
}

export default connect(null, mdp)(LogIn)