import React from 'react'
import InputText from '../../components/InputText.jsx'
import InputDate from '../../components/InputDate.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

export default props =>
    <Card titulo="Cadastrar Campanha" handleClick={props.handleClick}>        
        <div className="row">
            <InputText label="Nome" value={props.data.nome} name="nome"
                handleChange={props.handleChange} />
            <InputText label="Ano" value={props.data.ano} name="ano"
                handleChange={props.handleChange} />    
        </div>
        {props.data.visibleAlert ?
            <div className="row">
                <div className="col">
                    <Alert classe={props.data.classeAlert} message={props.data.messageAlert} />
                </div>
            </div>
            : ""}
    </Card>
