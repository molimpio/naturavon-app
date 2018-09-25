import React from 'react'

export default props =>
    <div className="col-2">
        <div className="form-group">
            <label>{props.label}</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-describedby="button-addon2"                    
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                        onClick={props.handleClick}>
                        <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>     