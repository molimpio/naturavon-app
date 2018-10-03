import React from 'react'
import InputDate from '../../components/InputDate.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

const revistas = [
    {id: 1, nome: 'Avon'}
]

export default props => {
    const { data, revista, visibleAlert, codigoAlert } = { ...props.data }
    return (
        <Card titulo="Cadastrar Pedido" handleClick={props.handleClick} showSalvar={true}>        
        <div className="row">
            <InputDate label="Data" value={data} name="data"
                handleChange={props.handleChange} />
            <Select label="Revista" value={revista} name="revista"
                values={revistas} handleChange={props.handleChange} />    
            
        </div>        
        <Alert codigo={codigoAlert} visible={visibleAlert} />  
    </Card>
    )
}    
