import React from 'react'
import { loadImageToCanvas, atrament, update_canvasTexture } from "../camerafiles/FaceFilterSource"
import { connect } from 'react-redux'
import { deleteFilter, saveFilter, deleteSavedFilter, getUsers } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';


class FilterCard extends React.Component {


    filterClickHandler = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on
        loadImageToCanvas(this.props.filterObj.img)
        this.props.renderFilterName(this.props.filterObj.name)
    }

    deleteClickHandler = () => {
        if (this.props.isSavedFilter) {
            this.props.deleteSavedFilter(this.props.filterObj.id)
            atrament.clear()
            update_canvasTexture()
        } else {
            this.props.deleteFilter(this.props.filterObj.id)
            atrament.clear()
            update_canvasTexture()
        }
    }

    saveClickHandler = () => {
        if (this.props.isOtherSavedFilter) {
            let saveObj = {
                filter_id: this.props.filterObj.filter_id,
                user_id: this.props.userId
            }
            this.props.saveFilter(saveObj)
            this.props.getUsers(this.props.userId)
        } else {
            let saveObj = {
                filter_id: this.props.filterObj.id,
                user_id: this.props.userId
            }
            this.props.saveFilter(saveObj)
            this.props.getUsers(this.props.userId)
        }

    }

    saveCountHandler = (num) => {
        switch (num) {
            case 1:
                return `${num} save`
            default:
                return `${num} saves`
        }
    }

    render() {
        return (
            <div className="filter-card" >
                {
                    this.props.isUserCard ?
                        <img id="filter-thumb" src={this.props.filterObj.img} alt="Filter" />
                        :
                        <img onClick={this.filterClickHandler} id="filter-thumb" src={this.props.filterObj.img} alt="Filter" />
                }
                < Divider style={{ margin: "0" }} />
                <div className="filter-card-footer" >
                    {this.saveCountHandler(this.props.filterObj.save_count)}
                    {
                        this.props.user ?
                            this.props.belongsToUser ?
                                <Button onClick={this.deleteClickHandler} icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" />
                                :
                                <Button onClick={this.saveClickHandler} icon="pi pi-bookmark" className="p-button-rounded p-button-text " />
                            :
                            null
                    }
                </div>
                < div className="filter-card-footer" >

                    {
                        this.props.belongsToUser ?
                            this.props.isSavedFilter ?
                                <NavLink className="filter-username" to={`/user/${this.props.filterObj.id_user}`}>
                                    <strong > @{this.props.filterObj.username}</strong>
                                </NavLink>
                                :
                                <NavLink className="filter-username" to={`/user/${this.props.userId}`}>
                                    <strong > @{this.props.filterObj.username}</strong>
                                </NavLink>
                            :
                            this.props.isUserCard ?
                                this.props.isOtherSavedFilter ?
                                    <NavLink className="filter-username" to={`/user/${this.props.filterObj.id_user}`}>
                                        <strong > @{this.props.filterObj.username}</strong>
                                    </NavLink>
                                    :

                                    <strong className="filter-username" >@{this.props.filterObj.username}</strong>
                                :
                                <NavLink className="filter-username" to={`/user/${this.props.filterObj.user.id}`}>
                                    <strong >@{this.props.filterObj.username}</strong>
                                </NavLink>
                    }

                    <span className="filter-name">
                        {this.props.filterObj.name}
                    </span>

                </div >

            </div >
        )
    }
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
        user: state.user,
        users: state.users
    }
}

export default connect(msp, mdp)(FilterCard)
