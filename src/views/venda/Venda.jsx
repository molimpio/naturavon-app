import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import VendaForm from '../venda/VendaForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import api from '../../database/api.js'

// const collectionName = 'pedidos'
// const columnsTable = ['Data', 'Revista', 'Total']

export default class Venda extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    getInitialState = () => {             
        const initialState = {
            pedido: '', campanha: '', cliente: '',
            visibleAlert: false, classeAlert: '', messageAlert: '',
            loading: false
        }
        return initialState
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        console.log(this.state)
        // if (this.state.data.length < 3) {
        //     this.setState({
        //         visibleAlert: true,
        //         classeAlert: 'warning',
        //         messageAlert: 'Dados incorretos, data é obrigatório!'
        //     })
        // } else {
        //     this.salvar()           
        // }
    }

    salvar() {
        this.setState({ loading: true })
        
        const dataSplit = this.state.data.split('-')
        const data = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
        const pedido = { 
            data: data,
            revista: this.state.revista.trim().toUpperCase(),
            total: 'R$ 0,00'
        }                       
        api.save(collectionName, pedido)
            .then(() => {
                this.setState({
                    visibleAlert: true,
                    classeAlert: 'success',
                    messageAlert: 'Dados cadastrados com sucesso!'
                })
                this.getPedidos()
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false,
                    visibleAlert: true,
                    classeAlert: 'warning',
                    messageAlert: 'Erro ao cadastrar dados!'
                })
            })
    }

    render() {
        return (
            <Container title="Vendas">
                <VendaForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {/* {this.state.loading ? 
                    <Loading message='Aguarde, carregando dados !' /> :                                    
                <Table columns={columnsTable}
                    data={this.state.pedidos} actions={[]} />
                } */}
            </Container>
        )
    }
}