import React from 'react'
import FaceFilter from './FaceFilter'
import { atrament } from "./FaceFilterSource"


class FilterMaker extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            atrament.color = 'blue'
        }, 5 * 1000)
    }

    render() {
        return (
            <div className="filter-maker">
                <h1>Make a Filter</h1>
                <FaceFilter />
            </div>
        )
    }

}

export default FilterMaker