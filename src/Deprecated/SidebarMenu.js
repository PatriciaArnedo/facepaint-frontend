// import React from 'react'
// import { withRouter } from "react-router-dom";
// import { setEventListnerEnabled } from '../FaceFilterLibrary/FaceFilterSource';
// import { Button } from 'semantic-ui-react'

// function SidebarMenu() {

//     let history = useHistory()

//     const createClickHandler = () => {
//         //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
//         //enables drawing when user clicks create filter
//         setEventListnerEnabled(true)
//         history.push('/new-filter')
//     }

//     const galleryClickHandler = () => {
//         //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
//         //disables drawing when user clicks filter gallery
//         setEventListnerEnabled(false)
//         history.push('/filter-gallery')
//     }

//     const exploreClickHandler = () => {
//         //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
//         //disables drawing when user clicks filter gallery
//         setEventListnerEnabled(false)
//         history.push('/home')
//     }

//     const savedClickHandler = () => {
//         //seteventlistener function from face filter library toggles event listeners to enable/disable drawing
//         //disables drawing when user clicks filter gallery
//         setEventListnerEnabled(false)
//         history.push('/saved-filters')
//     }

//     return (
//         <div className="sidebar-menu">
//             <br />
//             <Button onClick={createClickHandler} >Create Filter</Button>
//             <br />
//             <Button onClick={galleryClickHandler} >My Filters</Button>
//             <br />
//             <Button onClick={exploreClickHandler} >Explore Filters</Button>
//             <br />
//             <Button onClick={savedClickHandler} >Saved Filters</Button>
//             <br />
//         </div>
//     )

// }

// export default SidebarMenu