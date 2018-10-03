import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import VendaForm from './VendaForm.jsx'
import Table from '../../components/Table.jsx'
import VendaModal from './VendaModal.jsx'
import storageVenda from '../../database/storageVenda.js'
import storagePedido from '../../database/storagePedido.js'
import storageCampanha from '../../database/storageCampanha.js'
import storageCliente from '../../database/storageCliente.js'
import storageProduto from '../../database/storageProduto.js'
import constantes from '../../constants.js'

let itensVenda = []
const columnsTable = [
    'Cliente', 'Cód.', 'Produto', 'Pág', 'Qtde', 'Valor',
    'Desconto', 'Total', 'Excluir'
]

const styleP = {
    'fontSize': '20px',
    'marginTop': '15px'
}

export default class Venda extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState()

        this.handleChange = this.handleChange.bind(this)
        this.handleClickGetProduto = this.handleClickGetProduto.bind(this)
        this.handleClickSalvar = this.handleClickSalvar.bind(this)
        this.handleKeyPressProduto = this.handleKeyPressProduto.bind(this)
        this.handleKeyPressTotal = this.handleKeyPressTotal.bind(this)
        this.handleClickCalcular = this.handleClickCalcular.bind(this) 
        this.handleClickAdicionar = this.handleClickAdicionar.bind(this)                   
        this.excluir = this.excluir.bind(this)        
        this.dadosCadastrados = this.dadosCadastrados.bind(this)
    }

    componentDidMount() {
        this.getPedidos()
        this.getCampanhas()
        this.getClientes()
        this.getProdutos()        
    }

    getPedidos() {
        const pedidos = []
        storagePedido.getAll()
            .then(pedidosDB => {                
                pedidosDB.map(p => pedidos.push({ nome: `${p.revista} - ${p.data}` }))                
                this.setState({ pedidos, pedido: pedidos[0].nome })
            })
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))        
    }

    getCampanhas() {
        const campanhas = []
        storageCampanha.getAll()
            .then(campanhasDB => {
                campanhasDB.map(c => campanhas.push({ nome: `${c.nome} - ${c.ano}`}))
                this.setState({ campanhas, campanha: campanhas[0].nome })
            })
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))        
    }

    getClientes() {
        const clientes = []
        storageCliente.getAll()
            .then(clientesDB => {
                clientesDB.map(c => clientes.push({ nome: `${c.nome} - ${c.referencia}` }))
                this.setState({ clientes, cliente: clientes[0].nome })
            })
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))        
    }

    getProdutos() {
        storageProduto.getAll()
            .then(produtos => this.setState({ produtos }))
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))        
    }

    initialState() {
        return {
            pedidos: [], campanhas: [], produtos: [], clientes: [], itensVenda: [],
            pedido: '', campanha: '', cliente: '', visibleAlert: false, codigoAlert: 0,
            codProduto: '', nomeProduto: '', qtdeProduto: 1, totalPedido: 0,
            valorProduto: '', descontoProduto: 0, totalProduto: 0, pagProduto: '',     
            showModal: false, showSalvar: false,                 
            actions: [
                {
                    'action': ' Excluir', 'icon': 'fa-remove', 'type': 'danger', 'fn': this.excluir
                }
            ]
        }
    }    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleKeyPressProduto = (event) => {
        if (event.key == 'Enter') {
            this.handleClickGetProduto()
        }
    }

    handleKeyPressTotal = (event) => {
        if (event.key == 'Enter') {
            this.handleClickCalcular()
        }
    }

    handleClickGetProduto() {
        const codProduto = this.state.codProduto.trim()
        if (codProduto.length > 0) {
            const produto = this.state.produtos.filter(function (prod) {                
                return prod.cod == codProduto
            })
            if (produto.length > 0) {
                this.setState({ nomeProduto: produto[0].nome })
            } else {
                this.setState({
                    visibleAlert: true,
                    codigoAlert: constantes.ALERT_PROD_NAO_ENCONTRADO
                })
                setTimeout(() => this.setState({ visibleAlert: false }), 1000)
            }
        }

    }

    handleClickCalcular() {
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

    handleClickAdicionar() {
        const { codProduto, nomeProduto, qtdeProduto, valorProduto, descontoProduto, totalProduto, cliente, pagProduto } = this.state
        if (codProduto.length == 0 || nomeProduto.length < 3 || qtdeProduto == 0 ||
            valorProduto == 0 || totalProduto == 0 || pagProduto == '') {
            this.setState({
                visibleAlert: true,
                codigoAlert: constantes.ALERT_ERROR
            })
            setTimeout(() => this.setState({ visibleAlert: false }), 5000)
        } else {
            const itemVenda = {
                cliente: cliente, codProduto: codProduto, nomeProduto: nomeProduto.toUpperCase(),
                pagProduto: pagProduto, qtdeProduto: qtdeProduto, valorProduto: valorProduto,
                descontoProduto: descontoProduto, totalProduto: totalProduto
            }            
            itensVenda.push(itemVenda)
            
            const produto = {
                cod: this.state.codProduto,
                nome: this.state.nomeProduto.toUpperCase()
            }
            storageProduto.addItem(produto)

            const totalPedido = (parseFloat(this.state.totalPedido) + parseFloat(totalProduto)).toFixed(2)
            this.setState({
                codProduto: '', nomeProduto: '', qtdeProduto: 1,
                valorProduto: '', descontoProduto: 0, totalProduto: 0,
                totalPedido, pagProduto: '', itensVenda, showSalvar: true
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
        this.setState({ 
            itemVenda: itensVenda, totalPedido, 
            showSalvar:  itensVenda.length == 0 ? false : true
        })
    }

    handleClickSalvar() {        
        this.setState({ showModal: true })   
    }

    dadosCadastrados() {        
        this.setState({
            visibleAlert: true, showModal: false,
            codigoAlert: constantes.ALERT_VENDA_CADASTRADA,
            itensVenda: [], totalPedido: 0, showSalvar: false
        })
        itensVenda = []
        setTimeout(() => this.setState({ visibleAlert: false }), 5000)
    }

    render() {
        return (            
            <Container title="Vendas">
                <VendaModal show={this.state.showModal} 
                    itensVenda={this.state.itensVenda}
                    pedido={this.state.pedido}
                    campanha={this.state.campanha}
                    dadosCadastrados={this.dadosCadastrados} />
                <VendaForm data={this.state}
                    handleChange={this.handleChange}
                    handleClickGetProduto={this.handleClickGetProduto}
                    handleKeyPressProduto={this.handleKeyPressProduto}
                    handleKeyPressTotal={this.handleKeyPressTotal}
                    handleClickCalcular={this.handleClickCalcular}
                    handleClickAdicionar={this.handleClickAdicionar}
                    handleClickSalvar={this.handleClickSalvar} />
                <p className="text-right font-weight-bold text-monospace" style={styleP}>
                    Total Pedido: R$ {this.state.totalPedido}
                </p>
                <Table columns={columnsTable}
                    data={this.state.itensVenda} actions={this.state.actions} />
            </Container>
        )
    }
}    