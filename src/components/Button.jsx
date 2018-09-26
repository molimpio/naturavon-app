import React from 'react'

export default props =>
    <button type="button"
        style={props.style}
        className={`btn btn-${props.classe}`}
        onClick={props.handleClick}>
        {props.texto}&nbsp;
        <i className={`fa ${props.icon}`} aria-hidden="true"></i>
    </button>