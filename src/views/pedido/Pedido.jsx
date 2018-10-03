import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import Modal from '../../components/Modal.jsx'
import PedidoForm from './PedidoForm.jsx'
import PedidoModal from './PedidoModal.jsx'
import storagePedido from '../../database/storagePedido.js'
import storageVenda from '../../database/storageVenda.js'
import constantes from '../../constants.js'

const columnsTable = ['ID', 'Data', 'Revista', 'Total', 'Ações']

export default class Pedido extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickVendas = this.handleClickVendas.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        storagePedido.getAll()
            .then(pedidos => this.setState({ pedidos }))
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))
    }

    initialState() {
        return {
            data: this.formatDate(), revista: 'Avon', showPedidoModal: false,
            pedidos: [], visibleAlert: false, codigoAlert: 0, loading: false,
            vendasFiltro: [], totalPedido: 0,
            actions: [                
                {
                    'action': 'Vendas', 'icon': 'fa-credit-card-alt', 'type': 'success', 'fn': this.handleClickVendas
                }
            ]
        }
    }

    formatDate() {
        let day = new Date().getUTCDate().toString()
        let month = new Date().getUTCMonth().toString()
        let year = new Date().getUTCFullYear()

        if (day.length == 1) day = `0${day}`
        if (month.length == 1) month = `0${month}`
        return `${year}-${month}-${day}`
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        if (this.state.data.length < 3)
            this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR })
        else this.save()
    }

    save() {
        this.setState({ loading: true })

        const dataSplit = this.state.data.split('-')
        const data = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
        const pedido = {
            id: storagePedido.getNextID(),
            data: data,
            revista: this.state.revista.trim().toUpperCase(),
            total: 'R$ 0,00'
        }

        storagePedido.save(pedido)
            .then(() => {
                const pedidos = [...this.state.pedidos]
                pedidos.push(pedido)
                this.setState({
                    pedidos, data: this.formatDate(), revista: 'Avon',
                    visibleAlert: true, codigoAlert: constantes.ALERT_SUCCESS,
                    loading: false
                })
                setTimeout(() => this.setState({ visibleAlert: false }), 1000)
            }).catch(() =>
                this.setState({
                    visibleAlert: true, loading: false,
                    codigoAlert: constantes.ALERT_ERROR_DB_INSERT
                }))
    }

    handleClickVendas = (pedido) => {
        let vendasFiltro = []  
        let totalPedido = 0
        const keyPedido = `${pedido.revista} - ${pedido.data}`
        storageVenda.getAll()
            .then(vendas => {                
                vendas.map(venda => {
                    let keyVenda = venda.key.split('|')[0]
                    if (keyPedido == keyVenda) {
                        const obj = {
                            cliente: venda.cliente, codProduto: venda.codProduto,
                            pagProduto: venda.pagProduto, nomeProduto: venda.nomeProduto,
                            qtdeProduto: venda.qtdeProduto, valorProduto: venda.valorProduto,
                            descontoProduto: venda.descontoProduto, totalProduto: venda.totalProduto
                        }
                        vendasFiltro.push(obj)
                    }                    
                    totalPedido = (totalPedido + parseFloat(venda.totalProduto))
                })          
                vendasFiltro = storagePedido.orderVendasPedido(vendasFiltro)     
                totalPedido = totalPedido.toFixed(2)  
                this.setState({ vendasFiltro, showPedidoModal: true, totalPedido })               
            })
            .catch(error => console.log(error))
    }

    closeModal = () => this.setState({ showPedidoModal: false })

    render() {
        return (
            <Container title="Pedidos">
                <PedidoForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                 {this.state.loading ? 
                    <Modal>
                        <h3 style={{textAlign: 'center'}}>Cadastrando Dados !</h3>
                        <Loading />
                    </Modal> : null}
                <Table columns={columnsTable}
                    data={this.state.pedidos}
                    actions={this.state.actions} />                    
                <PedidoModal show={this.state.showPedidoModal}
                    data={this.state.vendasFiltro}
                    totalPedido={this.state.totalPedido}
                    closeModal={this.closeModal} />    
            </Container>
        )
    }
}