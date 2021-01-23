import React from 'react'
import { connect } from 'react-redux'
import { postFilter } from '../redux/actions'
import { atrament, update_canvasTexture } from "../camerafiles/FaceFilterSource"




class SaveFilterForm extends React.Component {

    state = {
        user_id: this.props.userId,
        img: this.props.img,
        name: ""
    }

    imgSrc = this.state.img

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.forceUpdate()
        this.imgSrc = this.state.img
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
            atrament.clear()
            update_canvasTexture()
            window.alert("Your filter was saved!")
            this.imgSrc = "https://i.imgur.com/px6x12m.png"
        }
    }


    render() {
        return (
            <div>
                <div>
                    <form className="save-filter-form" onSubmit={this.submitHandler}>

                        <input
                            id="form-input"
                            type="text"
                            value={this.state.name}
                            name={"name"}
                            onChange={this.changeHandler}
                            placeholder="Name Your Filter"
                        />
                        <button id="form-input" >Save Filter</button>
                    </form>
                </div>
                {this.props.img ?
                        <img id="filter-thumb" src={this.imgSrc} alt="filter img" />
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