import React from 'react'
import FaceFilterCanvas from './FaceFilterCanvas'
import SaveFilterForm from '../filterfiles/SaveFilterForm'
import { cameraStartup, update_canvasTexture, cameraShutdown } from "./FaceFilterSource"
import { connect } from 'react-redux'



class CreateFilter extends React.Component {

    state = {
        //Initial drawing settings 
        weight: 10,
        color: '#000000',
        mode: "draw",
        smoothing: 1.3,
        adaptiveStroke: true,
        recordStrokes: true,
        //atrament will be stored in state after being returned from camerastartup function
        atrament: undefined,
        //create canvas element to pass to camera startup
        canvas: document.createElement('canvas'),
        dataURL: null,
        points: 0
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
    }

    componentWillUnmount(){
        cameraShutdown()
        .then(console.log("camera shut down"))
        .catch(console.log)
    }


    handleChange = (e) => {
        //handles controlled form for drawing controls
        this.setState({ [e.target.name]: e.target.value }, this.setAtrament)
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
            this.setState({ dataURL: dataURL })
        } else {
            window.alert("Please Draw a Filter before Saving!")
        }
    }


    render() {
        return (
            <div className="filter-maker">
                <div>
                    <FaceFilterCanvas />
                </div>
                <div>
                    <form className="drawing-form" style={{ display: "inline-block" }}>
                        <h2>Drawing Controls</h2>

                        <label>
                            Stroke Color:&#32;
                            <input
                                id="form-input"
                                name="color"
                                type="color"
                                value={this.state.color}
                                onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                            Drawing Mode:
                            <select
                                id="form-input"
                                name="mode"
                                value={this.state.mode}
                                placeholder="Select a Mode"
                                onChange={this.handleChange}>
                                <option value="draw">Draw</option>
                                <option value="erase">Erase</option>
                                <option value="fill">fill</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Stroke Thickness:
                            <input
                                id="form-input"
                                name="weight"
                                type="number"
                                value={this.state.weight}
                                onChange={this.handleChange} />
                        </label>
                        <br />
                        <button id="form-input" onClick={this.canvasClearClickHandler}>Clear Canvas</button>
                        <button id="form-input" onClick={this.saveClickHandler}>Save Filter</button>
                    </form>
                    <br />
                    <SaveFilterForm key={this.state.dataURL} img={this.state.dataURL} />
                </div>
            </div >
        )
    }
}

function msp(state) {
    return {
        user: state.user,
        userId: state.userId
    }
}

export default connect(msp)(CreateFilter)
