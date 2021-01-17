import React from 'react'
import CreateFilter from '../components/CreateFilter'
import SidebarMenu from '../components/SidebarMenu'
import FilterGallery from './FilterGallery'
import { withRouter } from 'react-router-dom'



function MainContainer(props) {


    return (
        <>
            <SidebarMenu />
            {props.match.path === '/home' ?
                null
                :
                null
            }

            {props.match.path === '/new-filter' ?
                <CreateFilter />
                :
                null
            }

            {props.match.path === '/filter-gallery' ?
                <FilterGallery />
                :
                null
            }
        </>
    )

}

export default withRouter(MainContainer)
