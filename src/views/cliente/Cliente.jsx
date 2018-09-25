import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import ClienteForm from '../cliente/ClienteForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import api from '../../database/api.js'

const collectionName = 'clientes'
const columnsTable = ['Email', 'Nome', 'Referência', 'Telefone']

export default class Cliente extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getClientes()
    }

    getClientes() {
        this.resetState()
        this.setState({ loading: true })
        const clientes = []
        api.getAll(collectionName).then(querySnapshot => {
            querySnapshot.forEach(cliente => clientes.push(cliente.data()))
            this.setState({ clientes: clientes, loading: false })
        })
    }

    getInitialState = () => {
        const initialState = {
            nome: '', referencia: '', email: '', telefone: '', loading: false,
            clientes: [], visibleAlert: false, classeAlert: '', messageAlert: ''
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
        if (this.state.nome.length < 3 || this.state.referencia.length < 3) {
            this.setState({
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, nome e referência são obrigatórios!'
            })
        } else {
            this.salvar()
        }
    }

    salvar() {
        this.setState({ loading: true })
        
        const cliente = {
            nome: this.state.nome.trim().toUpperCase(),
            referencia: this.state.referencia.trim().toUpperCase(),
            email: this.state.email,
            telefone: this.state.telefone.trim()
        }

        api.save(collectionName, cliente)
            .then(() => {
                this.setState({
                    visibleAlert: true,
                    classeAlert: 'success',
                    messageAlert: 'Dados cadastrados com sucesso!'
                })
                this.getClientes()
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
            <Container title="Clientes">
                <ClienteForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {this.state.loading ? 
                    <Loading message='Aguarde, carregando dados !' /> :                                    
                <Table columns={columnsTable}
                    data={this.state.clientes} actions={[]} />
                }
            </Container>
        )
    }
}