import React from 'react'
import FilterTryOn from '../components/FilterTryOn'
import { connect } from 'react-redux'
import { getAllFilters } from '../redux/actions'
import FilterCard from '../components/FilterCard'


class ExploreFilters extends React.Component {

    componentDidMount() {
        this.props.getAllFilters(this.props.userId)
    }

    renderFilters = () => {
        return this.props.allFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} />)
    }

    render() {
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div className="centered-div">
                    <h3>Explore Filters</h3>
                   
                    <div id="filter-container">
                        {this.renderFilters()}
                    </div>
                </div>
            </div>
        )
    }
}

function msp(state) {
    return {
        allFilters: state.allFilters,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getAllFilters: (userId) => dispatch(getAllFilters(userId)),
    }
}

export default connect(msp, mdp)(ExploreFilters)