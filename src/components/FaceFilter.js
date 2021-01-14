import React from 'react'
import main, {atrament} from "./FaceFilterSource"

function FaceFilter(props) {

    const canvas = document.createElement('canvas');
    main(canvas)

    setTimeout(() => {
        atrament.color = 'blue'
    }, 5 * 1000)

    return (
        <>
        </>
    )

}

export default FaceFilter