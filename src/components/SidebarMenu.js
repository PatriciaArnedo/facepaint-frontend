import React from 'react'
import { useHistory } from "react-router-dom";
import { setEventListnerEnabled } from '../FaceFilterLibrary/FaceFilterSource';

function SidebarMenu() {

    let history = useHistory()

    const createClickHandler = () => {    
            //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
            //enables drawing when user clicks create filter
            setEventListnerEnabled(true)
            history.push('/new-filter')
    }

    const galleryClickHandler = () => {
            //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
            //disables drawing when user clicks filter gallery
            setEventListnerEnabled(false)
            history.push('/filter-gallery')
        
        
    }

    return (
        <div className="sidebar-menu">
            <br />
            <button onClick={createClickHandler} >Create Filter</button>
            <br />
            <button onClick={galleryClickHandler} >Filter Gallery</button>
        </div>
    )

}

export default SidebarMenu