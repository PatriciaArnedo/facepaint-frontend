import React from 'react'
import FilterCard from '../filterfiles/FilterCard'
import { TabView, TabPanel } from 'primereact/tabview';

class UserProfile extends React.Component {

    state = {
        searchTerm: ""
    }

    renderFilters = () => {
        if (this.props.userObj.filters && this.props.userObj.filters.length) {
            const filteredFilters = this.props.userObj.filters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
        } else {
            return <p>This User Hasn't Created Any Filters Yet</p>
        }
    }

    renderSavedFilters = () => {
        if (this.props.userObj.save_filters && this.props.userObj.save_filters.length) {
            const filteredFilters = this.props.userObj.save_filters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
        } else {
            return <p>This User Hasn't Saved Any Filters Yet</p>
        }
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-profile">
                <div className="user-details">
                    <h3>@{this.props.userObj.username}</h3>
                    <p>{this.props.userObj.name}</p>
                    {this.props.userObj.instagram ? <p>instagram: {this.props.userObj.instagram}</p> : null}
                    <p>{this.props.userObj.bio}</p>
                    <h5>{this.props.userObj.save_count} Total Saves</h5>
                </div>
                <input
                    id="form-input"
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.searchOnChange}
                    name="searchTerm"
                    placeholder="Search Filters by Name"
                />
                <br />
                <TabView>
                    <TabPanel header={`Filters`} leftIcon="pi pi-fw pi-palette">
                        <div className="profile-filters">
                            {this.renderFilters()}
                        </div>
                    </TabPanel>
                    <TabPanel header="Saved Filters" leftIcon="pi pi-fw pi-bookmark">
                        <div className="profile-filters">
                            {this.renderSavedFilters()}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        )
    }

}

export default UserProfile