import React from 'react'
import FaceFilterCanvas from './FaceFilterCanvas'
import { cameraStartup } from "../FaceFilterLibrary/FaceFilterSource"
import { connect } from 'react-redux'



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
        }
    }

    render() {
        return (
            <div className="filter-try-on">
                <div>
                    <h2>Try Filters</h2>
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


export default connect(msp)(FilterTryOn)