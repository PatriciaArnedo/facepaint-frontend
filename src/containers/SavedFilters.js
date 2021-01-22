import React from 'react'
import FilterTryOn from '../components/FilterTryOn'
import { connect } from 'react-redux'
import { getSavedFilters } from '../redux/actions'
import FilterCard from '../components/FilterCard'


class SavedFilters extends React.Component {

    componentDidMount() {
        this.props.getSavedFilters(this.props.userId)
    }

    renderFilters = () => {
        return this.props.savedFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={true} isSavedFilter={true} />)
    }

    render() {
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div className="centered-div">
                    <h3>My Saved Filters</h3>
                   
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
        savedFilters: state.savedFilters,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getSavedFilters: (userId) => dispatch(getSavedFilters(userId)),
    }
}

export default connect(msp, mdp)(SavedFilters)