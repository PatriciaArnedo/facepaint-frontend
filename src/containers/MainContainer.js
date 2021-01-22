import React from 'react'
import CreateFilter from '../components/CreateFilter'
import FilterGallery from './FilterGallery'
import { withRouter } from 'react-router-dom'
import ExporeFilters from './ExporeFilters'
import SavedFilters from './SavedFilters'



function MainContainer(props) {


    return (
        <>
            {/* <SidebarMenu /> */}
            {props.match.path === '/home' ?
                <ExporeFilters />

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

            {/* {props.match.path === '/explore-filters' ?
                <ExporeFilters />
                :
                null
            } */}

            {props.match.path === '/saved-filters' ?
                <SavedFilters />
                :
                null
            }
        </>
    )

}

export default withRouter(MainContainer)
