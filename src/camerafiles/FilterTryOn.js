import React from 'react'
import FaceFilterCanvas from './FaceFilterCanvas'
import { cameraStartup, cameraShutdown } from "./FaceFilterSource"
import { connect } from 'react-redux'
import {getUsers } from '../redux/actions'



class FilterTryOn extends React.Component {

    state = {
        //atrament will be stored in state after being returned from camerastartup function
        atrament: undefined,
        //create canvas element to pass to camera startup
        canvas: document.createElement('canvas'),
    }

    componentDidMount = () => {
        //only run filter initialization if user is logged in
        if (this.props.user) {
            //camerastartup starts up face filter/face recognition
            cameraStartup(this.state.canvas).then(() => {
                console.log("camera is ready")
            })
            .catch(console.log)
        }
        this.props.getUsers(this.props.userId)
    }

    componentWillUnmount(){
        this.componentCleanup()
    }

    //cleanup for when component unmounts
    componentCleanup = () => {
        cameraShutdown()
        .then(console.log("camera shut down"))
        .catch(console.log)
    }

    render() {
        return (
            <div className="filter-try-on">
                <div>
                    <FaceFilterCanvas />
                </div>
            </div >
        )
    }
}

function msp(state) {
    return {
        user: state.user
    }
}

function mdp(dispatch) {
    return {
        getUsers: (userId) => dispatch(getUsers(userId)),
    }
}

export default connect(msp, mdp)(FilterTryOn)