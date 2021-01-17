import React from 'react'
import FilterTryOn from '../components/FilterTryOn'
import { connect } from 'react-redux'
import { getFilters } from '../redux/actions'
import FilterCard from '../components/FilterCard'


class FilterGallery extends React.Component {

    componentDidMount() {
        this.props.getFilters(this.props.userId)
    }

    renderFilters = () => {
        return this.props.filters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} />)
    }

    render() {
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div>
                    <h3>Your Filters</h3>
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
        filters: state.filters,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getFilters: (userId) => dispatch(getFilters(userId))
    }
}

export default connect(msp, mdp)(FilterGallery)