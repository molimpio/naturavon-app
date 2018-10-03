import React from 'react'

const styleModalWrapper = {
    "width": `${window.innerWidth}px`,
    "height": `${window.innerHeight}px`,
    "backgroundColor": "rgb(0, 0, 0, 0.3)",
    "position": "fixed",
    "top": "0",
    "left": "0",
    "zIndex": "99999",
    "overflow": "hidden"
}

export default props => {    
    let leftPercent = 0
    let topPercent = 0

    if (props.width && props.height) {
        const leftPx = (window.innerWidth - props.width) / 2
        leftPercent = (leftPx * 100) / window.innerWidth    

        const topPx = (window.innerHeight - props.height) / 2
        topPercent = (topPx * 100) / window.innerHeight
    } else {
        leftPercent = 25
        topPercent = 30
    }
    

    return (
        <div style={styleModalWrapper}>
        <div style={{            
            "width": props.width ? `${props.width}px` : "500px",
            "height": props.height ? `${props.height}px` : "150px",
            "backgroundColor": "white",
            "position": "absolute",
            "top": `${topPercent}%`,
            "left": `${leftPercent}%`,            
            "zIndex": "9999999",
            "borderRadius": "5px",
            "padding": "30px"
        }}>
            {props.children}
        </div>
    </div>
    )
}        