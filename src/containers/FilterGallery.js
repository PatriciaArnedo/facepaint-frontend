import React from 'react'
import FilterTryOn from '../components/FilterTryOn'
import { connect } from 'react-redux'
import { getUserFilters } from '../redux/actions'
import FilterCard from '../components/FilterCard'


class FilterGallery extends React.Component {

    componentDidMount() {
        this.props.getUserFilters(this.props.userId)
    }

    renderFilters = () => {
        return this.props.userFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={true} isSavedFilter={false} />)
    }

    render() {
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div className="centered-div">
                    <h3>My Filters</h3>
                   
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
        userFilters: state.userFilters,
        userId: state.userId
    }
}

function mdp(dispatch) {
    return {
        getUserFilters: (userId) => dispatch(getUserFilters(userId)),
    }
}

export default connect(msp, mdp)(FilterGallery)