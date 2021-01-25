import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../redux/actions'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'

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
                <form id="login-form" onSubmit={this.submitHandler}>
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
                            type="password"
                            value={this.state.password}
                            name="password"
                            onChange={this.changeHandler}
                        />
                        <label htmlhtmlFor="in">Password</label>
                    </span>
                    <br />
                    <Button label="Log In" />
                </form>
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