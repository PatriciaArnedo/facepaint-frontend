import React from 'react'
import FilterCard from './FilterCard'


function UserCard(props) {


    const renderFilters = () => {
        return props.userObj.filters.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
    }
    return (
        <div className="user-card">
            <h3>@{props.userObj.username}</h3>
            <div className="filter-sample">
                {renderFilters()}
            </div>
        </div>
    )

}

export default UserCard