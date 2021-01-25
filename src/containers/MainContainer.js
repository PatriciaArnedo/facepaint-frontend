import React from 'react'
import CreateFilter from '../filterfiles/CreateFilter'
import FilterGallery from '../filterfiles/FilterGallery'
import { withRouter } from 'react-router-dom'
import ExporeFilters from '../filterfiles/ExploreFilters'
import SavedFilters from '../filterfiles/SavedFilters'
import UserContainer from './UserContainer'



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

            {props.match.path === '/discover-artists' ?
                <UserContainer />
                :
                null
            }

            {props.match.path === '/saved-filters' ?
                <SavedFilters />
                :
                null
            }
        </>
    )

}

export default withRouter(MainContainer)
