import React from 'react'
import InputText from '../../components/InputText.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

export default props => {
    const { nome, referencia, email, telefone, visibleAlert, codigoAlert } = {...props.data}
    return (
        <Card titulo="Cadastrar Cliente" handleClick={props.handleClick} showSalvar={true} >
            <div className="row">
                <InputText label="Nome" value={nome} name="nome"
                    handleChange={props.handleChange} />
                <InputText label="Referência" value={referencia} name="referencia" 
                    handleChange={props.handleChange} />
                <InputText label="Email" value={email} name="email"
                    handleChange={props.handleChange} />
                <InputText label="Telefone" value={telefone} name="telefone"
                    handleChange={props.handleChange} />
            </div>                       
            <Alert codigo={codigoAlert} visible={visibleAlert} />                                          
        </Card >
    )
}    
