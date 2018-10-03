import React from 'react'
import InputButton from '../../components/InputButton.jsx'
import InputText from '../../components/InputText.jsx'
import InputNumber from '../../components/InputNumber.jsx'
import Button from '../../components/Button.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'

const styleButtonAdicionar = {
    'height': '38px',
    'marginTop': '29px'
}

export default props => {
    const { pedidos, campanhas, clientes, pedido, campanha, cliente, showSalvar,
        codProduto, nomeProduto, qtdeProduto, valorProduto, descontoProduto,
        totalProduto, pagProduto, visibleAlert, codigoAlert } = { ...props.data }                
    return (
        <Card titulo="Cadastrar Venda" handleClick={props.handleClickSalvar} showSalvar={showSalvar}>
            <div className="row">
                <Select label="Pedido" value={pedido} name="pedido"
                    values={pedidos} handleChange={props.handleChange} />

                <Select label="Campanha" value={campanha} name="campanha"
                    values={campanhas} handleChange={props.handleChange} />

                <Select label="Cliente" value={cliente} name="cliente"
                    values={clientes} handleChange={props.handleChange} />

                <InputButton label="Cód. Produto *" name="codProduto" value={codProduto}
                    handleChange={props.handleChange} handleClick={props.handleClickGetProduto}
                    handleKeyPress={props.handleKeyPressProduto}
                    icon="search" />
                <InputNumber label="Pág. *" value={pagProduto} name="pagProduto" 
                    handleChange={props.handleChange} />
            </div>
            <div className="row">
                <InputText label="Produto *" value={nomeProduto} name="nomeProduto"
                    handleChange={props.handleChange} />

                <InputNumber label="Qtde *" value={qtdeProduto} name="qtdeProduto"
                    handleChange={props.handleChange} />

                <InputNumber label="Valor *" value={valorProduto} name="valorProduto"
                    handleChange={props.handleChange} />

                <InputNumber label="Desconto" value={descontoProduto} name="descontoProduto"
                    handleChange={props.handleChange} />

                <InputButton label="Total *" name="totalProduto" value={totalProduto}
                    handleChange={props.handleChange} handleClick={props.handleClickCalcular}
                    handleKeyPress={props.handleKeyPressTotal} icon="gear" />

                <Button classe="primary" texto="Adicionar" icon="fa-plus" style={styleButtonAdicionar}
                    handleClick={props.handleClickAdicionar} />
            </div>
            <Alert codigo={codigoAlert} visible={visibleAlert} />
        </Card>
    )
}