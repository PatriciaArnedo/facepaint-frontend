import React from 'react'
import { loadImageToCanvas } from "../FaceFilterLibrary/FaceFilterSource"



function FilterCard(props){


    const mapImgToFace = () => {
        //uses loadImagetoCanvas function from facefilter library to try drawn filter on
        
            loadImageToCanvas(props.filterObj.img)
    }
    
    return(
        <div>
            <img onClick={mapImgToFace} id ="filter-thumb" src={props.filterObj.img} alt="Filter"/>
            <h4>{props.filterObj.name}</h4>
        </div>
    )

}

export default FilterCard