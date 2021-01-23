import React from 'react'
import { loadImageToCanvas, atrament, update_canvasTexture } from "../facefilter/FaceFilterSource"
import { connect } from 'react-redux'
import { deleteFilter, saveFilter, deleteSavedFilter } from '../redux/actions'
import { NavLink } from 'react-router-dom'



function FilterCard(props) {


    const mapImgToFace = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on

        loadImageToCanvas(props.filterObj.img)
    }

    const deleteClickHandler = () => {
        if (props.isSavedFilter) {
            props.deleteSavedFilter(props.filterObj.id)
            atrament.clear()
            update_canvasTexture()
        } else {
            props.deleteFilter(props.filterObj.id)
            atrament.clear()
            update_canvasTexture()
        }
    }

    const saveClickHandler = () => {
        const saveObj = {
            filter_id: props.filterObj.id,
            user_id: props.userId
        }
        props.saveFilter(saveObj)
    }

    const saveCountHandler = (num) => {
        switch(num) {
            case 1: 
                return <h5>{`${num} save`}</h5>
            default:
                return <h5>{`${num} saves`}</h5>
        }
    }

    return (
        <div className="filter-card">
            <img onClick={mapImgToFace} id="filter-thumb" src={props.filterObj.img} alt="Filter" />
            <h4>{props.filterObj.name}</h4>
            {props.belongsToUser ?
                props.isSavedFilter ? 
                <NavLink to={`/user/${props.filterObj.id_user}`}>
                <h5>@{props.filterObj.username}</h5> 
                </NavLink>
                : null
                :
                props.isUserCard ? saveCountHandler(props.filterObj.save_count) : 
                <NavLink to={`/user/${props.filterObj.user.id}`}>
                <h5>@{props.filterObj.username}</h5>
                </NavLink>
            }
            {props.user ?
                props.belongsToUser ?
                    <button onClick={deleteClickHandler} >Delete Filter</button>
                    :
                    <button onClick={saveClickHandler} >Save Filter</button>
                :
                null
            }
        </div>
    )
}

function mdp(dispatch) {
    return {
        deleteFilter: (filterId) => dispatch(deleteFilter(filterId)),
        deleteSavedFilter: (saveId) => dispatch(deleteSavedFilter(saveId)),
        saveFilter: (saveObj) => dispatch(saveFilter(saveObj))
    }
}

function msp(state) {
    return {
        userId: state.userId,
        user: state.user
    }
}

export default connect(msp, mdp)(FilterCard)
