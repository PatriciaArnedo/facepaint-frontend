import React from 'react'
import { loadImageToCanvas } from "../FaceFilterLibrary/FaceFilterSource"



function FilterCard(props){


    const mapImgToFace = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on
        
            loadImageToCanvas(props.filterObj.img)
    }
    
    return(
        <div>
            <h4>{props.filterObj.name}</h4>
            <br />
            <img onClick={mapImgToFace} id ="filter-thumb" src={props.filterObj.img} alt="Filter"/>
        </div>
    )

}

export default FilterCard