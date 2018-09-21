import React from 'react'

export default props =>
    <div className="col">
        <div className="form-group">
            <label>{props.label}</label>
            <input type="text"
                className="form-control"
                placeholder={props.label}
                value={props.value} />
        </div>
    </div> 