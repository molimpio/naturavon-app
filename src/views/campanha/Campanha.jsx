import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import CampanhaForm from '../campanha/CampanhaForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import api from '../../database/api.js'

const collectionName = 'campanhas'
const columnsTable = ['Ano', 'Nome']

export default class Campanha extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getCampanhas()
    }

    getCampanhas() {
        this.setState({ loading: true })
        const campanhas = []
        api.getAll(collectionName).then(querySnapshot => {
            querySnapshot.forEach(campanha => campanhas.push(campanha.data()))
            this.setState({ campanhas: campanhas, loading: false })            
        })
    }

    getInitialState = () => {
        const initialState = {
            nome: '', campanhas: [], ano: new Date().getFullYear(),
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
        if (this.state.nome.length < 3) {
            this.setState({
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, nome é obrigatório!'
            })
        } else {
            this.salvar()           
        }
    }

    salvar() {
        this.setState({ loading: true })
        this.resetState()
        const campanha = { ano: this.state.ano, nome: this.state.nome }                       
        api.save(collectionName, campanha)
            .then(() => {
                this.setState({
                    visibleAlert: true,
                    classeAlert: 'success',
                    messageAlert: 'Dados cadastrados com sucesso!'
                })
                this.getCampanhas()
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
            <Container title="Campanhas">
                <CampanhaForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {this.state.loading ? 
                    <Loading message='Aguarde, carregando dados !' /> :                                    
                <Table columns={columnsTable}
                    data={this.state.campanhas} actions={[]} />
                }
            </Container>
        )
    }
}