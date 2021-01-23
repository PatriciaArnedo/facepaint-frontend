import React from 'react'
import FilterTryOn from '../camerafiles/FilterTryOn'
import { connect } from 'react-redux'
import { getSavedFilters, getUsers } from '../redux/actions'
import FilterCard from '../filterfiles/FilterCard'


class SavedFilters extends React.Component {

    state ={
        searchTerm: ""
    }

    componentDidMount() {
        this.props.getSavedFilters(this.props.userId)
        this.props.getUsers(this.props.userId)
    }

    renderFilters = () => {
        const filteredFilters = this.props.savedFilters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={true} isSavedFilter={true} isUserCard={false}/>)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.props.savedFilters)
        return (
            <div className="filter-gallery">
                <div>
                    <FilterTryOn />
                </div>
                <div className="centered-div">
                    <h3>My Saved Filters</h3>
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
        savedFilters: state.savedFilters,
        userId: state.userId,
        users: state.users
    }
}

function mdp(dispatch) {
    return {
        getSavedFilters: (userId) => dispatch(getSavedFilters(userId)),
        getUsers: (userId) => dispatch(getUsers(userId))
    }
}

export default connect(msp, mdp)(SavedFilters)