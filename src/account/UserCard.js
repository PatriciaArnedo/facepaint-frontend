import React from 'react'
import FilterCard from '../filterfiles/FilterCard'
import { NavLink } from 'react-router-dom'
import { Divider } from 'primereact/divider';
import { withRouter } from "react-router-dom";


function UserCard(props) {


    const renderFilters = () => {
        let newArray = props.userObj.filters.slice(0, 3)
        return newArray.map(filterObj => <FilterCard key={filterObj.id} filterObj={filterObj} belongsToUser={false} isSavedFilter={false} isUserCard={true} />)
    }

    const avatarClickHandler = () => {
        props.history.push(`/user/${props.userObj.id}`)
    }

    return (
        <>
        <div className="user-card">
            <div className="user-card-details">
            <img onClick={avatarClickHandler} alt="user avatar" style={{display:"inline-block"}} src={props.userObj.avatar ? props.userObj.avatar : "https://i.imgur.com/igyvLpE.jpg"} className="profile-avatar" />
            <NavLink style={{ display: 'inline-block' }} to={`/user/${props.userObj.id}`}>
                <h3>@{props.userObj.username}</h3>
            </NavLink>
            </div>
            <div className="filter-sample">
            <Divider style={{height:"200px", margin:"auto 30px auto 30px"}} layout="vertical" />
                {renderFilters()}
            </div>
            <br />
        </div>
        <Divider style={{width:"1000px", margin:"50px 0px 50px 0px"}}/>
        </>
    )

}

export default withRouter(UserCard)