import React from 'react'
import FilterCard from '../filterfiles/FilterCard'
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';

class UserProfile extends React.Component {

    state = {
        searchTerm: ""
    }

    renderFilters = () => {
        if (this.props.userObj.filters && this.props.userObj.filters.length) {
            const filteredFilters = this.props.userObj.filters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} isOtherSavedFilter={false} />)
        } else {
            return <p>This user hasn't created any filters yet.</p>
        }
    }

    renderSavedFilters = () => {
        if (this.props.userObj.save_filters && this.props.userObj.save_filters.length) {
            const filteredFilters = this.props.userObj.save_filters.filter(filter => filter.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            return filteredFilters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} isOtherSavedFilter={true} />)
        } else {
            return <p>This user hasn't saved any filters yet.</p>
        }
    }

    searchOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="user-profile">
                <div className="profile-header">
                    <img src={this.props.userObj.avatar ? this.props.userObj.avatar : "https://i.imgur.com/igyvLpE.jpg"} className="profile-avatar" alt="user avatar" />
                    <div className="user-details">
                        <h3>@{this.props.userObj.username}</h3>
                        <p>{this.props.userObj.name}</p>
                        {this.props.userObj.instagram ? <p>instagram: {this.props.userObj.instagram}</p> : null}
                        <p>{this.props.userObj.bio}</p>
                        <p>{this.props.userObj.save_count === 1? `${this.props.userObj.save_count} total save`  : `${this.props.userObj.save_count} total saves` }</p>
                        <br />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText id="form-input" name="searchTerm" value={this.state.searchTerm} onChange={this.searchOnChange} placeholder="Search Filter Name" />
                        </span>
                    </div>
                </div>
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