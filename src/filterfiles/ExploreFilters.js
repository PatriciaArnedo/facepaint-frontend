import React from 'react'
import FilterTryOn from '../camerafiles/FilterTryOn'
import { connect } from 'react-redux'
import { getAllFilters, getUsers } from '../redux/actions'
import FilterCard from '../filterfiles/FilterCard'
import { InputText } from 'primereact/inputtext';

class ExploreFilters extends React.Component {

    state = {
        searchTerm: "",
        name: "",
    }

    componentDidMount() {
        // console.log("this.props.allFilters.length", this.props.allFilters.length)
        this.props.getAllFilters(this.props.userId)
        this.props.getUsers(this.props.userId)
    }

    renderFilters = () => {
        const filteredFilters = this.props.allFilters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={false} renderFilterName={this.renderFilterName} isOtherSavedFilter={false} />)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderFilterName = (name) => {
        this.setState({ name })
    }

    render() {
        return (
            <div className="filter-gallery">
                <div className="camera-card">
                    <FilterTryOn />
                    <br />
                    <b>{this.state.name}</b>
                </div>
                <div className="centered-div">
                    <div className="title-search-filters">
                        <h2>Explore Filters</h2>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText name="searchTerm" value={this.state.searchTerm} onChange={this.searchOnChange} placeholder="Search Filter Name" />
                        </span>
                    </div>
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