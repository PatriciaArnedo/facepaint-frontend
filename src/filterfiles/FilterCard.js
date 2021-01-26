import React from 'react'
import { loadImageToCanvas, atrament, update_canvasTexture } from "../camerafiles/FaceFilterSource"
import { connect } from 'react-redux'
import { deleteFilter, saveFilter, deleteSavedFilter, getUsers } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';


function FilterCard(props) {


    const filterClickHandler = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on
        loadImageToCanvas(props.filterObj.img)
        props.renderFilterName(props.filterObj.name)
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
        if (props.isOtherSavedFilter) {
            let saveObj = {
                filter_id: props.filterObj.filter_id,
                user_id: props.userId
            }
            props.saveFilter(saveObj)
            props.getUsers(props.userId)
        } else {
            let saveObj = {
                filter_id: props.filterObj.id,
                user_id: props.userId
            }
            props.saveFilter(saveObj)
            props.getUsers(props.userId)
        }
       
    }

    const saveCountHandler = (num) => {
        switch (num) {
            case 1:
                return `${num} save`
            default:
                return `${num} saves`
        }
    }

    return (
        <div className="filter-card">
            {props.isUserCard ?
                <img id="filter-thumb" src={props.filterObj.img} alt="Filter" />
                :
                <img onClick={filterClickHandler} id="filter-thumb" src={props.filterObj.img} alt="Filter" />
            }
            <Divider style={{ margin: "0" }} />
            <div className="filter-card-footer">

                {props.belongsToUser ?
                    props.isSavedFilter ?
                        <NavLink className="filter-username" to={`/user/${props.filterObj.id_user}`}>
                            <strong > @{props.filterObj.username}</strong>
                        </NavLink>
                        : null
                    :
                    props.isUserCard ? saveCountHandler(props.filterObj.save_count) :
                        <NavLink className="filter-username" to={`/user/${props.filterObj.user.id}`}>
                            <strong >@{props.filterObj.username}</strong>
                        </NavLink>
                }

                <span className="filter-name">
                    {props.filterObj.name}
                </span>
                {props.user ?
                    props.belongsToUser ?
                        <Button onClick={deleteClickHandler} icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" />
                        :
                        <Button onClick={saveClickHandler} icon="pi pi-bookmark" className="p-button-rounded p-button-text " />
                    :
                    null
                }
            </div>
        </div>
    )
}

function mdp(dispatch) {
    return {
        deleteFilter: (filterId) => dispatch(deleteFilter(filterId)),
        deleteSavedFilter: (saveId) => dispatch(deleteSavedFilter(saveId)),
        saveFilter: (saveObj) => dispatch(saveFilter(saveObj)),
        getUsers: (userId) => dispatch(getUsers(userId)),
    }
}

function msp(state) {
    return {
        userId: state.userId,
        user: state.user
    }
}

export default connect(msp, mdp)(FilterCard)
