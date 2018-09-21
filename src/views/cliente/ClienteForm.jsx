import React from 'react'
import InputText from '../../components/InputText.jsx'
import Card from '../../components/Card.jsx'

export default props =>
    <Card titulo="Cadastrar Cliente">
        <div className="row">
            <InputText label="Nome" value={props.data.value} />
            <InputText label="Referência" value={props.data.value} />
            <InputText label="Email" value={props.data.value} />
            <InputText label="Telefone" value={props.data.value} />
        </div>
    </Card>
