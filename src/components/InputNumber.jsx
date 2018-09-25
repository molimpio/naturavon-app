import React from 'react'

export default props =>
    <div className="col">
        <div className="form-group">
            <label>{props.label}</label>
            <input type="number"
                className="form-control"
                placeholder={props.label}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}  />
        </div>
    </div> 