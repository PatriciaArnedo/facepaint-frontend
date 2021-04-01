import React from 'react'


const FaceFilter = () => {

    return (
        <div className="video-canvas">
            {/* creates camera canvas to be used by face filter library */}
            <canvas id='jeeFaceFilterCanvas' width="600" height="600" />
        </div>
    )
}

export default FaceFilter



