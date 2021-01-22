import React from 'react'
import FilterCard from './FilterCard'
import { NavLink } from 'react-router-dom'


function UserCard(props) {


    const renderFilters = () => {
        let newArray = props.userObj.filters.slice(0, 3)
        return newArray.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
    }
    return (
        <div className="user-card">
            <NavLink to={`/user/${props.userObj.id}`}>
            <h3>@{props.userObj.username}</h3>
            </NavLink>
            <div className="filter-sample">
                {renderFilters()}
            </div>
        </div>
    )

}

export default UserCard