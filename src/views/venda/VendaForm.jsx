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
const itens = []

export default class VendaForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pedidos: [], campanhas: [], produtos: [], clientes: [],
            pedido: '', campanha: '', cliente: '', itens: [],
            codProduto: '', nomeProduto: '', qtdeProduto: 1,
            valorProduto: 0, descontoProduto: 0, totalProduto: 0,
            visibleAlert: false, classeAlert: '', messageAlert: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.getProduto = this.getProduto.bind(this)
        this.calcular = this.calcular.bind(this)
        this.salvar = this.salvar.bind(this)
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
            this.setState({ clientes, cliente: clientes[0].nome })
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
            this.setState({ pedidos, pedido: pedidos[0].nome })
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
            this.setState({ campanhas, campanha: campanhas[0].nome })
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

    getProduto() {
        const codProduto = this.state.codProduto.trim()
        if (codProduto.length > 0) {
            const produto = this.state.produtos.filter(function (prod) {
                return prod.cod == codProduto
            })
            if (produto.length > 0) {
                this.setState({ nomeProduto: produto[0].nome })
            } else {
                this.setState({ nomeProduto: 'Não encontrou...' })
            }
        }

    }

    calcular() {
        let valor = this.state.valorProduto.toString().replace(',', '.')
        valor = parseFloat(valor).toFixed(2)
        let total = this.state.qtdeProduto * valor
        if (this.state.descontoProduto > 0) {
            let desconto = this.state.descontoProduto.toString().replace(',', '.')
            desconto = parseFloat(desconto).toFixed(2)
            total = total - desconto
        }
        this.setState({ totalProduto: total.toFixed(2) })
    }

    salvar() {
        const { codProduto, nomeProduto, qtdeProduto, valorProduto, descontoProduto, totalProduto } = this.state
        if (codProduto.length == 0 || nomeProduto.length < 3 || qtdeProduto == 0 ||
            valorProduto == 0 || totalProduto == 0) {
            this.setState({
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, os campos (cód, nome, qtde, valor e total) são obrigatórios!'
            })
            setTimeout(() => this.setState({ visibleAlert: false }), 5000)
        } else {
            const itemVenda = {
                codProduto: codProduto,
                nomeProduto: nomeProduto,
                qtdeProduto: qtdeProduto,
                valorProduto: valorProduto,
                descontoProduto: descontoProduto,
                totalProduto: totalProduto
            }            
            itens.push(itemVenda)
            console.log(itens)
            this.setState({ itens: itens })
            console.log(this.state)
        }
    }

    render() {
        return (
            <Card titulo="Cadastrar Venda" handleClick={this.salvar}>
                <div className="row">
                    <Select label="Pedido" value={this.state.pedido} name="pedido"
                        values={this.state.pedidos} handleChange={this.handleChange} />

                    <Select label="Campanha" value={this.state.campanha} name="campanha"
                        values={this.state.campanhas} handleChange={this.handleChange} />

                    <Select label="Cliente" value={this.state.cliente} name="cliente"
                        values={this.state.clientes} handleChange={this.handleChange} />

                    <InputButton label="Cód. Produto" name="codProduto" value={this.state.codProduto}
                        handleChange={this.handleChange} handleClick={this.getProduto}
                        icon="search" />
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

                    <InputButton label="Total" name="totalProduto" value={this.state.totalProduto}
                        handleChange={this.handleChange} handleClick={this.calcular}
                        icon="gear" />
                </div>
                {this.state.visibleAlert ?
                    <div className="row">
                        <div className="col">
                            <Alert classe={this.state.classeAlert}
                                message={this.state.messageAlert} />
                        </div>
                    </div>
                    : ""}
            </Card>
        )
    }
}    