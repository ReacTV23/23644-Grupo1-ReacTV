import React from 'react'
import { ThreeCircles } from  'react-loader-spinner'

const Loader = () => {
    return (
        <ThreeCircles
            height="200"
            width="200"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#003686"
            innerCircleColor="#E08400"
            middleCircleColor="#003686"
        />
    )
}

export default Loader
