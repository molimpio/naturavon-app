import React from 'react'
import InputText from '../../components/InputText.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

export default props =>
    <Card titulo="Cadastrar Cliente" handleClick={props.handleClick}>
        <div className="row">
            <InputText label="Nome" value={props.data.value} name="nome"
                handleChange={props.handleChange} />
            <InputText label="Referência" value={props.data.value} name="referencia"
                handleChange={props.handleChange} />
            <InputText label="Email" value={props.data.value} name="email"
                handleChange={props.handleChange} />
            <InputText label="Telefone" value={props.data.value} name="telefone"
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
