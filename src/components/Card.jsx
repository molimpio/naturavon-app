import React from 'react'
import Button from '../components/Button.jsx'

export default props =>
    <div className="card">
        <div className="card-header">
            {props.titulo}
        </div>
        <div className="card-body">
            {props.children}
        </div>
        <div className="card-footer text-muted">
            <Button classe="success" texto="Salvar" icon="fa-check" 
                handleClick={props.handleClick}/>
        </div>
    </div>