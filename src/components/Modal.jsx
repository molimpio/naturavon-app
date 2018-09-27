import React from 'react'

const styleModalWrapper = {
    "width": `${window.innerWidth}px`,
    "height": `${window.innerHeight}px`,
    "backgroundColor": "rgb(227, 227, 227, 0.6)",
    "position": "absolute",
    "top": "0",
    "left": "-228px",
    "zIndex": "99999"
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
            "borderRadius": "10px",
            "padding": "30px"
        }}>
            {props.children}
        </div>
    </div>