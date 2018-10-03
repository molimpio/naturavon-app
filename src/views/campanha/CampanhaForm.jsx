import React from 'react'
import InputText from '../../components/InputText.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

export default props => {
    const { nome, ano, visibleAlert, codigoAlert } = { ...props.data }
    return (
        <Card titulo="Cadastrar Campanha" handleClick={props.handleClick} showSalvar={true}>
            <div className="row">
                <InputText label="Nome" value={nome} name="nome"
                    handleChange={props.handleChange} />
                <InputText label="Ano" value={ano} name="ano"
                    handleChange={props.handleChange} />                                    
            </div>
            <Alert codigo={codigoAlert} visible={visibleAlert} />  
        </Card >
    )
}    
