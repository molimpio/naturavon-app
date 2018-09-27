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

export default props =>
    <div style={styleModalWrapper}>
        <div style={{
            "width": "500px",
            "height": props.height ? `${props.height}px` : "150px",
            "backgroundColor": "white",
            "position": "absolute",
            "top": "25%",
            "left": "30%",
            "zIndex": "9999999",
            "borderRadius": "5px",
            "padding": "30px"
        }}>
            {props.children}
        </div>
    </div>