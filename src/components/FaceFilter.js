import React from 'react'
import main from "./FaceFilterSource"

class FaceFilter extends React.Component {


    componentDidMount() {

        const canvas = document.createElement('canvas');
        main(canvas)
    
    }

    render() {

        return (
            <>
                <canvas id='jeeFaceFilterCanvas' width="600" height="600" />
            </>
        )
    }

}

export default FaceFilter