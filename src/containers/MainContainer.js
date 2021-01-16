import React from 'react'
import FilterMaker from '../components/FilterMaker'
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
                <FilterMaker />
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
