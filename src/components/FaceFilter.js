import React from 'react'
import main from "./FaceFilterSource"

class FaceFilter extends React.Component {


    componentDidMount() {

        const canvas = document.createElement('canvas');
        main(canvas)
    
    }

    render() {

        return (
            <div className="video-canvas">
                <canvas id='jeeFaceFilterCanvas' width="600" height="600" />
            </div>
        )
    }

}

export default FaceFilter