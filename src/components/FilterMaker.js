import React from 'react'
import FaceFilter from './FaceFilter'
import main from "./FaceFilterSource"


class FilterMaker extends React.Component {

    state = {
        weight: 10,
        color: '#ffffff',
        mode: "draw",
        smoothing: 1.3,
        adaptiveStroke: true,
        recordStrokes: true,
        atrament: undefined,
    }

    setAtrament = () => {
        // if (!this.state.atrament) {
        //     return
        // }
        this.state.atrament.weight = parseInt(this.state.weight)
        this.state.atrament.color = this.state.color
        this.state.atrament.mode = this.state.mode
        this.state.atrament.smoothing = this.state.smoothing
        this.state.atrament.adaptiveStroke = this.state.adaptiveStroke
        this.state.atrament.recordStrokes = this.state.recordStrokes
    }

    componentDidMount() {
        const canvas = document.createElement('canvas');
        main(canvas).then((atrament) => {
            this.setState({atrament}, this.setAtrament)
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value },this.setAtrament)
    }

    clickHandler = (e) => {
        e.preventDefault()
        this.state.atrament.clear()
    }

    render() {
        return (
            <div className="filter-maker">
                <h1>Make a Filter</h1>
                <FaceFilter />
                <form style={{display:"inline-block"}}>
                    <label>
                        Choose a Mode:
                        <select name="mode" value={this.state.mode} onChange={this.handleChange}>
                            <option value="draw">Draw</option>
                            <option value="erase">Erase</option>
                            <option value="fill">Fill</option>
                        </select>
                    </label>
                    <label>
                        Stroke Thickness:
                    <input
                            name="weight"
                            type="number"
                            value={this.state.weight}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Stroke Color:
                    <input
                            name="color"
                            type="color"
                            value={this.state.color}
                            onChange={this.handleChange} />
                    </label>
                    <button clickHandler={this.clickHandler}>Clear Canvas</button>
                </form>
            </div >
        )
    }

}

export default FilterMaker