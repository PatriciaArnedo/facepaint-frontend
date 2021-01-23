import React from 'react'
import FilterCard from './FilterCard'


class UserProfile extends React.Component {

    state ={
        searchTerm: ""
    }

    renderFilters = () => {
        const filteredFilters = this.props.userObj.filters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-profile">
                <h3>@{this.props.userObj.username}</h3>
                <h5>{this.props.userObj.save_count} Total Saves</h5>
                <input
                        id="form-input"
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.searchOnChange}
                        name="searchTerm"
                        placeholder="Search Filters by Name"
                    />
                    <br />
                <div className="profile-filters">
                    {this.renderFilters()}
                </div>
            </div>
        )
    }

}

export default UserProfile