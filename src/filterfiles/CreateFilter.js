import React from 'react'
import FaceFilterCanvas from '../camerafiles/FaceFilterCanvas'
import SaveFilterForm from './SaveFilterForm'
import { cameraStartup, update_canvasTexture, cameraShutdown } from "../camerafiles/FaceFilterSource"
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'primereact/button';
import {getUsers } from '../redux/actions'


class CreateFilter extends React.Component {

    state = {
        //Initial drawing settings 
        weight: 10,
        color: '#1f96f0',
        mode: "draw",
        smoothing: 1.3,
        adaptiveStroke: true,
        recordStrokes: true,
        //atrament will be stored in state after being returned from camerastartup function
        atrament: undefined,
        //create canvas element to pass to camera startup
        canvas: document.createElement('canvas'),
        dataURL: null,
        points: 0,
        beenClicked: false
    }

    setAtrament = () => {
        //do not set any settings if atrament is not assigned yet
        if (!this.state.atrament) {
            return
        }

        //store atrament in variable to avoid setting state directly
        const atrament = this.state.atrament

        //assign drawing controls in state to atrament library functions using variable
        atrament.weight = parseInt(this.state.weight)
        atrament.color = this.state.color
        atrament.mode = this.state.mode
        atrament.smoothing = this.state.smoothing
        atrament.adaptiveStroke = this.state.adaptiveStroke
        atrament.recordStrokes = this.state.recordStrokes

        //assign drawing controls in state to atrament functions using setState
        this.setState({ atrament })

        //event listener for drawn stroke from atrament library
        this.state.atrament.addEventListener('strokerecorded', ({ stroke }) => this.setState({ points: stroke.points.length })
        )
    }

    componentDidMount = () => {
        //only run filter initialization if user is logged in
        if (this.props.user) {
            //camerastartup starts up the facefilter/face recognition and 
            //returns a promise that returns the atrament library
            cameraStartup(this.state.canvas).then((atrament) => {
                //setstate with the returned atrament library
                this.setState({ atrament: atrament }, this.setAtrament)
            })
                .catch(console.log)
        }
        this.props.getUsers(this.props.userId)

    }

    componentWillUnmount() {
        cameraShutdown()
            .then(console.log("camera shut down"))
            .catch(console.log)
    }


    handleChange = (e) => {
        //handles controlled form for drawing controls
        this.setState({ [e.target.name]: e.target.value }, this.setAtrament)
    }

    handleDropdown = (e, data) => {
        //handles controlled form for drawing controls
        this.setState({ [data.name]: data.value }, this.setAtrament)
    }

    canvasClearClickHandler = (e) => {
        e.preventDefault()

        //calls atrament library clear function
        this.state.atrament.clear()
        //facefilter libray updatecanvastexture function must be called for change to take effect
        update_canvasTexture()
        this.setState({
            points: 0,
            dataURL: null
        })
    }

    saveClickHandler = (e) => {
        e.preventDefault()
        //atrament library toimage function saves the canvas as a dataurl
        if (this.state.points > 0) {
            let dataURL = this.state.atrament.toImage("image/png")
            this.setState({
                dataURL: dataURL,
                beenClicked: !this.state.beenClicked
            })
        } else {
            window.alert("Please Draw a Filter before Saving!")
        }
    }

    cancelHandler = () => {
        this.setState({
            beenClicked: !this.state.beenClicked
        })
    }

    render() {
        console.log("drawing mode", this.state?.atrament?.mode)
        return (
            <div className="filter-maker">
                <div className="camera-card">
                    <FaceFilterCanvas />
                </div>
                <div className="drawing-form-card">
                    <form className="drawing-form" style={{ display: "inline-block" }}>
                        <h2>Brush Settings</h2>
                            Color:<br />
                        <input
                            id="form-input"
                            name="color"
                            type="color"
                            value={this.state.color}
                            onChange={this.handleChange} />

                        <br />
                        <label>
                            Mode:
                            <Dropdown
                                fluid
                                selection
                                id="form-input"
                                name="mode"
                                value={this.state.mode}
                                placeholder="Select a Mode"
                                onChange={this.handleDropdown}
                                options={options}
                            />
                        </label>
                        <label>
                            Stroke Size:
                            <input
                                id="form-input"
                                name="weight"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.weight}
                                onChange={this.handleChange} />
                        </label>
                        <br />
                        <Button className="p-button-warning" style={{ marginRight: "10px" }} id="form-input" onClick={this.canvasClearClickHandler} label="Clear Canvas" />
                        <Button id="form-input" onClick={this.saveClickHandler} label="Save Filter" />
                    </form>
                    <br />
                    {this.state.beenClicked ?
                        <SaveFilterForm key={this.state.dataURL} img={this.state.dataURL} cancelHandler={this.cancelHandler}/>
                        :
                        null
                    }
                </div>
            </div >
        )
    }
}

const options = [
    { key: "draw", text: "Draw", value: "draw" },
    { key: "erase", text: "Erase", value: "erase" },
    // { key: "fill", text: "Fill", value: "fill" },
]

function msp(state) {
    return {
        user: state.user,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getUsers: (userId) => dispatch(getUsers(userId)),
    }
}


export default connect(msp, mdp)(CreateFilter)
