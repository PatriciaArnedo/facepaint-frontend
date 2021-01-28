import React from 'react'
import { connect } from 'react-redux'
import { postFilter } from '../redux/actions'
import { atrament, update_canvasTexture } from "../camerafiles/FaceFilterSource"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'



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
        if (!this.state.img) {
            window.alert("No Filter Found")
        } else if(this.state.name.length === 0){
            window.alert("Please Name Your Filter Before Saving")
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
            this.props.cancelHandler()
        }
    }


    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <h3>Save Your Filter</h3>
                            <div className="save-filter-card">
                            {this.props.img ?
                                <img id="filter-thumb" src={this.imgSrc} alt="filter img" />
                                :
                                null}
                            </div>
                <div>
                    <form className="save-filter-form" onSubmit={this.submitHandler}>
                        <span className="p-float-label">
                            <InputText
                                value={this.state.name}
                                name={"name"}
                                onChange={this.changeHandler}
                            />
                            <label htmlhtmlfor="in">Name Your Filter</label>
                        </span>
                        <Button id="form-input" label="Save Filter" />
                    </form>
                        <Button className="p-button-warning" onClick={this.props.cancelHandler} id="form-input" label="Cancel" />
                </div>
                </div>
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