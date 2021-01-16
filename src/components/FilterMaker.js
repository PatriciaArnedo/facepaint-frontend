import React from 'react'
import FaceFilter from './FaceFilter'
import main, { update_canvasTexture } from "./FaceFilterSource"
import { connect } from 'react-redux'


class FilterMaker extends React.Component {

    state = {
        weight: 10,
        color: '#ffffff',
        mode: "draw",
        smoothing: 1.3,
        adaptiveStroke: true,
        recordStrokes: true,
        atrament: undefined,
        canvas: document.createElement('canvas'),
        dataURL: null
    }

    setAtrament = () => {
        // if (!this.state.atrament) {
        //     return
        // }
        //store atrament in variable to avoid setting state directly
        const atrament = this.state.atrament

        //assign drawing controls in state to atrament functions using variable
        atrament.weight = parseInt(this.state.weight)
        atrament.color = this.state.color
        atrament.mode = this.state.mode
        atrament.smoothing = this.state.smoothing
        atrament.adaptiveStroke = this.state.adaptiveStroke
        atrament.recordStrokes = this.state.recordStrokes

        //assign drawing controls in state to atrament functions using setState
        this.setState({ atrament })
    }

    componentDidMount = () => {
        //only run filter initialization if user is logged in
        if (this.props.user) {
            main(this.state.canvas).then((atrament) => {
                this.setState({ atrament: atrament }, this.setAtrament)
            })
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.setAtrament)
    }

    canvasClearClickHandler = (e) => {
        e.preventDefault()

        this.state.atrament.clear()
        update_canvasTexture()
    }

    saveClickHandler = (e) => {
        e.preventDefault()
        let dataURL = this.state.atrament.toImage("image/png")
        this.setState({dataURL}, ()=>{console.log("DataUrl",this.state.dataURL)})
    }

    render() {
        return (
            <div className="filter-maker">
                <div>
                    <h2>Make a Filter</h2>
                    <FaceFilter />
                </div>
                <div>
                    <form id="drawing-form" style={{ display: "inline-block" }}>
                        <h2>Drawing Controls</h2>

                        <label>
                            Stroke Color:
                            <input
                                id="form-input"
                                name="color"
                                type="color"
                                value={this.state.color}
                                onChange={this.handleChange} />
                        </label>
                        <br />

                        <label>
                            Choose a Mode:
                            <select id="form-input" name="mode" value={this.state.mode} onChange={this.handleChange}>
                                <option value="draw">Draw</option>
                                <option value="erase">Erase</option>
                                <option value="fill">Fill</option>
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
                    {this.state.dataURL ?  
                    <img id="filter-thumb" src={this.state.dataURL} alt="filter img"/>
                    :
                    null }

                </div>
            </div >
        )
    }

}

function msp(state) {
    return {
        user: state.user
    }
}


export default connect(msp)(FilterMaker)