import React from 'react'
import { connect } from 'react-redux'
import { postFilter } from '../redux/actions'



class SaveFilterForm extends React.Component {

    state = {
        user_id: this.props.userId,
        img: this.props.img,
        name: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.forceUpdate()
    }


    submitHandler = (e) => {
        e.preventDefault()
        if(!this.state.img){
            window.alert("No Filter Found")
        } else {
            this.props.submitHandler(this.state)
            this.setState({
                user_id: null,
                img: "",
                name: ""
            })
            window.alert("Your filter was saved!")
        }
    }

    render() {
        return (
            <div>
                <div>
                    <form id="save-filter-form" onSubmit={this.submitHandler}>

                        <input
                            type="text"
                            value={this.state.name}
                            name={"name"}
                            onChange={this.changeHandler}
                            placeholder="Name Your Filter"
                        />
                        <button>Save Filter</button>
                    </form>
                </div>
                {this.props.img ?
                        <img id="filter-thumb" src={this.props.img} alt="filter img" />
                        :
                        null}
            </div>
        )
    }

}

const mdp = (dispatch) => {
    return {
        submitHandler: (filterObj) => dispatch(postFilter(filterObj))
    }
}

function msp(state) {
    return {
        user: state.user,
        userId: state.userId
    }
}

export default connect(msp, mdp)(SaveFilterForm)