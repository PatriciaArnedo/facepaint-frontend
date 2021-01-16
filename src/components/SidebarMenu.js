import React from 'react'
import { useHistory } from "react-router-dom";
import { setEventListnerEnabled } from './FaceFilterSource';


function SidebarMenu() {

    let history = useHistory()

    const createClickHandler = () => {
        setEventListnerEnabled(true)
        history.push('/new-filter')
    }

    const galleryClickHandler = () => {
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