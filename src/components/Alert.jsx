import React from 'react'

const style = {
    textAlign: 'center'
}

export default props => 
    <div className={`alert alert-${props.classe}`} role="alert" style={style}>
        {props.message}
    </div>