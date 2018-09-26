import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import InputButton from '../../components/InputButton.jsx'
import InputText from '../../components/InputText.jsx'
import InputNumber from '../../components/InputNumber.jsx'
import Button from '../../components/Button.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Table from '../../components/Table.jsx'
import Alert from '../../components/Alert.jsx'
import api from '../../database/api.js'

const collectionNamePedidos = 'pedidos'
const collectionNameCampanhas = 'campanhas'
const collectionNameProdutos = 'produtos'
const collectionNameClientes = 'clientes'
const itens = []
const columnsTable = [
    'Cliente', 'Cód.', 'Produto', 'Qtde', 'Valor',
    'Desconto', 'Total', 'Excluir'
]

const styleButtonAdicionar = {
    'height': '38px',
    'marginTop': '29px'
}

const styleP = {
    'fontSize': '20px',
    'marginTop': '15px'
}

export default class Venda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pedidos: [], campanhas: [], produtos: [], clientes: [],
            pedido: '', campanha: '', cliente: '', itensVenda: [],
            codProduto: '', nomeProduto: '', qtdeProduto: 1, totalPedido: 0,
            valorProduto: '', descontoProduto: 0, totalProduto: 0,
            visibleAlert: false, classeAlert: '', messageAlert: '',
            actions: [ 
                { 
                    'action': ' Excluir', 'icon': 'fa-remove', 'type':'danger', 'fn': this.excluir 
                } 
            ]  
        }
        this.handleChange = this.handleChange.bind(this)
        this.getProduto = this.getProduto.bind(this)
        this.calcular = this.calcular.bind(this)
        this.salvar = this.salvar.bind(this)
        this.adicionar = this.adicionar.bind(this)
        this.excluir = this.excluir.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleKeyPressTotal = this.handleKeyPressTotal.bind(this)
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

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.getProduto()
        }
    }

    handleKeyPressTotal = (event) => {
        if (event.key == 'Enter') {
            this.calcular()
        }
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

    adicionar() {
        const { codProduto, nomeProduto, qtdeProduto, valorProduto, descontoProduto, totalProduto, cliente } = this.state
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
                cliente: cliente,
                codProduto: codProduto,
                nomeProduto: nomeProduto,
                qtdeProduto: qtdeProduto,
                valorProduto: valorProduto,
                descontoProduto: descontoProduto,
                totalProduto: totalProduto
            }
            itens.push(itemVenda)
            const totalPedido = (parseFloat(this.state.totalPedido) + parseFloat(totalProduto)).toFixed(2)
            this.setState({
                itensVenda: itens, codProduto: '', nomeProduto: '', qtdeProduto: 1,
                valorProduto: '', descontoProduto: 0, totalProduto: 0, totalPedido
            })
        }
    }

    excluir = (itemVenda) => {        
        
        const itemVendaCombine = `${itemVenda.cliente}-${itemVenda.codProduto}`
        const itensVenda = this.state.itensVenda

        itensVenda.map((item, index) => {
            const produtoCombine = `${item.cliente}-${item.codProduto}`
            if (produtoCombine == itemVendaCombine) {
                itensVenda.splice(index, 1)
            }
        })
        const totalPedido = (parseFloat(this.state.totalPedido) - parseFloat(itemVenda.totalProduto)).toFixed(2)
        this.setState({ itemVenda: itensVenda, totalPedido })
    }

    salvar() {
        console.log('enviar dados para bd')
    }

    render() {
        return (
            <Container title="Vendas">
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
                            handleKeyPress={this.handleKeyPress}
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
                            handleKeyPress={this.handleKeyPressTotal} icon="gear" />

                        <Button classe="primary" texto="Adicionar" icon="fa-plus" style={styleButtonAdicionar}
                            handleClick={this.adicionar} />
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
                <p className="text-right font-weight-bold text-monospace" style={styleP}>
                    Total Pedido: R$ {this.state.totalPedido}
                </p>    
                <Table columns={columnsTable}
                    data={this.state.itensVenda} actions={this.state.actions} />
            </Container>
        )
    }
}    