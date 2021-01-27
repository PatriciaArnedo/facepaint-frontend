import React from 'react'
import FilterTryOn from '../camerafiles/FilterTryOn'
import { connect } from 'react-redux'
import { getUserFilters } from '../redux/actions'
import FilterCard from '../filterfiles/FilterCard'
import { InputText } from 'primereact/inputtext';


class FilterGallery extends React.Component {

    state = {
        searchTerm: "",
        name: ""
    }

    componentDidMount() {
        this.props.getUserFilters(this.props.userId)
    }

    renderFilters = () => {
        const filteredFilters = this.props.userFilters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={true} isSavedFilter={false} isUserCard={false} renderFilterName={this.renderFilterName} isOtherSavedFilter={false} />)
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
                        <h2>My Filters</h2>
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