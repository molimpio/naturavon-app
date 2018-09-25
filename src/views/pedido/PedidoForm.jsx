import React from 'react'
import InputDate from '../../components/InputDate.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

const revistas = [
    {id: 1, nome: 'Avon'}
]

export default props =>
    <Card titulo="Cadastrar Pedido" handleClick={props.handleClick}>        
        <div className="row">
            <InputDate label="Data" value={props.data.data} name="data"
                handleChange={props.handleChange} />
            <Select label="Revista" value={props.data.revista} name="revista"
                values={revistas} handleChange={props.handleChange} />    
            
        </div>
        {props.data.visibleAlert ?
            <div className="row">
                <div className="col">
                    <Alert classe={props.data.classeAlert} message={props.data.messageAlert} />
                </div>
            </div>
            : ""}
    </Card>
