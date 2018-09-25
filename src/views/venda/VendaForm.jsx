import React, { Component } from 'react'
import InputButton from '../../components/InputButton.jsx'
import InputText from '../../components/InputText.jsx'
import InputNumber from '../../components/InputNumber.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Alert from '../../components/Alert.jsx'
import api from '../../database/api.js'

const collectionNamePedidos = 'pedidos'
const collectionNameCampanhas = 'campanhas'
const collectionNameProdutos = 'produtos'
const collectionNameClientes = 'clientes'

export default class VendaForm extends Component {
    constructor(props) {
        super(props) 
        this.state = { 
            pedidos: [], campanhas: [], produtos: [], clientes: [],
            codProduto: '', nomeProduto: '',
            qtdeProduto: 1, valorProduto: 0, descontoProduto: 0, totalProduto: 0
        }        
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getPedidos()
        this.getCampanhas()
        this.getProdutos()
        this.getClientes()
    }

    getClientes() {        
        const clientes = []
        api.getAll(collectionNameClientes).then(querySnapshot => {
            querySnapshot.forEach(cliente => {
                const c = cliente.data()                
                clientes.push({
                    id: Math.random(), nome: c.nome
                })
            })
            this.setState({ clientes })
        })
    }

    getPedidos() {        
        const pedidos = []
        api.getAll(collectionNamePedidos).then(querySnapshot => {
            querySnapshot.forEach(pedido => {
                const p = pedido.data()                
                pedidos.push({
                    id: Math.random(), nome: `${p.data} - ${p.revista}`
                })
            })
            this.setState({ pedidos })
        })
    }

    getCampanhas() {
        const campanhas = []
        api.getAll(collectionNameCampanhas).then(querySnapshot => {
            querySnapshot.forEach(campanha => {
                const c = campanha.data()                
                campanhas.push({
                    id: Math.random(), nome: `${c.nome} - ${c.ano}`
                })
            })
            this.setState({ campanhas })
        })
    }

    getProdutos() {
        const produtos = []
        api.getAll(collectionNameProdutos).then(querySnapshot => {
            querySnapshot.forEach(produto => produtos.push(produto.data()))
            this.setState({ produtos })
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        const codProduto = this.state.codProduto.trim()
        if (codProduto.length > 0) {
            const produto = this.state.produtos.filter(function(prod){
                return prod.cod == codProduto
            })
            if (produto.length > 0) {                
                this.setState({ nomeProduto: produto[0].nome })
            } else {
                this.setState({ nomeProduto: 'Não encontrou...' })
            }
        }
        
    }

    render() {        
        return (
            <Card titulo="Cadastrar Venda" handleClick={this.props.handleClick}>
                <div className="row">
                    <Select label="Pedido" value={this.props.data.pedido} name="pedido"
                        values={this.state.pedidos} handleChange={this.props.handleChange} />

                    <Select label="Campanha" value={this.props.data.campanha} name="campanha"
                        values={this.state.campanhas} handleChange={this.props.handleChange} />
                    
                    <Select label="Cliente" value={this.props.data.cliente} name="cliente"
                        values={this.state.clientes} handleChange={this.props.handleChange} />

                    <InputButton label="Cód. Produto" name="codProduto" value={this.state.codProduto}
                        handleChange={this.handleChange} handleClick={this.handleClick} />                        
                </div>
                <div className="row">
                    <InputText label="Produto" value={this.state.nomeProduto} name="nomeProduto"
                        handleChange={this.handleChange} />    

                    <InputNumber label="Qtde" value={this.state.qtdeProduto} name="qtdeProduto"
                        handleChange={this.handleChange} />    
                    <InputNumber label="Valor" value={this.state.valorProduto} name="valorProduto"
                        handleChange={this.handleChange} />        
                    <InputNumber label="Desconto" value={this.state.descontoProduto} name="descontoProduto"
                        handleChange={this.handleChange} />                                    
                    <InputNumber label="Total" value={this.state.totalProduto} name="totalProduto"
                        handleChange={this.handleChange} />        
                </div>
                {this.props.data.visibleAlert ?
                    <div className="row">
                        <div className="col">
                            <Alert classe={this.props.data.classeAlert}
                            message={this.props.data.messageAlert} />
                        </div>
                    </div>
                    : ""}
            </Card>
        )
    }
}    