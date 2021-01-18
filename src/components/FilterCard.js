import React from 'react'
import { loadImageToCanvas } from "../FaceFilterLibrary/FaceFilterSource"
import { connect } from 'react-redux'
import { deleteFilter } from '../redux/actions'



function FilterCard(props){


    const mapImgToFace = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on
        
            loadImageToCanvas(props.filterObj.img)
    }

    const deleteClickHandler = () => {
        props.deleteFilter(props.filterObj.id)
    }
    
    return(
        <div className="filter-card">
            <img onClick={mapImgToFace} id ="filter-thumb" src={props.filterObj.img} alt="Filter"/>
            <h4>{props.filterObj.name}</h4>
            <button onClick={deleteClickHandler} id="delete-button"> Delete Filter</button>
        </div>
    )

}

function mdp(dispatch) {
    return {
        deleteFilter: (filterId) => dispatch(deleteFilter(filterId))
    }
}

export default connect(null, mdp)(FilterCard)
