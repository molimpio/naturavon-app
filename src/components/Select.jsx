import React from 'react'

export default props =>
    <div className="col">
        <div className="form-group">
            <label>{props.label}</label>
            <select className="form-control" 
                name={props.name} value={props.value}
                onChange={props.handleChange}>
                {props.values.map((v, index) => 
                    <option key={index} value={v.nome}>{v.nome}</option>
                )}                
            </select>
        </div>
    </div> 