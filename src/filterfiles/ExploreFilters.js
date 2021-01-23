import React from 'react'
import FilterTryOn from '../camerafiles/FilterTryOn'
import { connect } from 'react-redux'
import { getAllFilters, getUsers } from '../redux/actions'
import FilterCard from '../filterfiles/FilterCard'


class ExploreFilters extends React.Component {

    state ={
        searchTerm: ""
    }

    componentDidMount() {
        this.props.getAllFilters(this.props.userId)
        this.props.getUsers(this.props.userId)
    }

    renderFilters = () => {
        const filteredFilters = this.props.allFilters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={false}/>)
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
                    <h3>Explore Filters</h3>
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
        allFilters: state.allFilters,
        userId: state.userId,
        users: state.users
    }
}

function mdp(dispatch) {
    return {
        getAllFilters: (userId) => dispatch(getAllFilters(userId)),
        getUsers: (userId) => dispatch(getUsers(userId))
    }
}

export default connect(msp, mdp)(ExploreFilters)