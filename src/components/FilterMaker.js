import React from 'react'
import FaceFilter from './FaceFilter'
import main, {update_canvasTexture} from "./FaceFilterSource"
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
    }

    setAtrament = () => {
        // if (!this.state.atrament) {
        //     return
        // }
        const atrament = this.state.atrament
        atrament.weight = parseInt(this.state.weight)
        atrament.color = this.state.color
        atrament.mode = this.state.mode
        atrament.smoothing = this.state.smoothing
        atrament.adaptiveStroke = this.state.adaptiveStroke
        atrament.recordStrokes = this.state.recordStrokes
        this.setState({atrament})
    }

    componentDidMount = () => {
        if(this.props.user) {
            main(this.state.canvas).then((atrament) => {
                this.setState({atrament}, this.setAtrament)
            })
        }
    }

    // componentWillUnmount = () => {
    //     if(!this.props.user){
    //         this.abortController.abort()
    //     }
    // }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value },this.setAtrament)
    }

    clickHandler = (e) => {
        e.preventDefault()
        
        this.state.atrament.clear()
        update_canvasTexture()
    }

    render() {
        return (
            <div className="filter-maker">
                <div>
                <h1>Make a Filter</h1>
                <FaceFilter />
                </div>
                <form id="drawing-form" style={{display:"inline-block"}}>
                    <label>
                        Choose a Mode:
                        <select name="mode" value={this.state.mode} onChange={this.handleChange}>
                            <option value="draw">Draw</option>
                            <option value="erase">Erase</option>
                            <option value="fill">Fill</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Stroke Thickness:
                    <input
                            name="weight"
                            type="number"
                            value={this.state.weight}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Stroke Color:
                    <input
                            name="color"
                            type="color"
                            value={this.state.color}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <button onClick={this.clickHandler}>Clear Canvas</button>
                </form>
            </div >
        )
    }

}

function msp(state){
    return {
        user: state.user
    }
}


export default connect(msp)(FilterMaker)