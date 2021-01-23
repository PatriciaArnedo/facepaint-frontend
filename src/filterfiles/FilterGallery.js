import React from 'react'
import FilterTryOn from '../camerafiles/FilterTryOn'
import { connect } from 'react-redux'
import { getUserFilters } from '../redux/actions'
import FilterCard from '../filterfiles/FilterCard'


class FilterGallery extends React.Component {

    state ={
        searchTerm: ""
    }

    componentDidMount() {
        this.props.getUserFilters(this.props.userId)
    }

    renderFilters = () => {
        const filteredFilters = this.props.userFilters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={true} isSavedFilter={false} isUserCard={false}/>)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div className="centered-div">
                    <h3>My Filters</h3>
                    <input
                        id="form-input"
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.searchOnChange}
                        name="searchTerm"
                        placeholder="Search Filters by Name"
                    />
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