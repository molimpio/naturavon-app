import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import PedidoForm from '../campanha/PedidoForm.jsx'
import Table from '../../components/Table.jsx'

const columnsTable = ['ID', 'Nome', 'Data', 'Ações']
const campanhas = []

export default class Campanha extends Component {    

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleEditar = this.handleEditar.bind(this) 
        this.handleExcluir = this.handleExcluir.bind(this)
    }   
    
    getInitialState = () => {
        const initialState = {
            id: '', nome: '', data: new Date().toISOString().substring(0, 10), campanhas: [],
            visibleAlert: false, classeAlert: '', messageAlert: '',
            actions: [
                {
                    'action': ' Editar', 'icon': 'fa-pencil', 'type':'primary', 'fn': this.handleEditar
                },
                {
                    'action': ' Excluir', 'icon': 'fa-remove', 'type':'danger', 'fn': this.handleExcluir
                }
            ] 
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
            if(this.state.id == '') this.salvar()
            else if(this.state.id != '') this.atualizar()
        }
    }

    salvar() {
        const campanha = {
            id: Math.random().toFixed(2),
            nome: this.state.nome,
            data: this.state.data
        }        
        campanhas.push(campanha)        
        this.resetState()
        this.setState({ campanhas: campanhas })        
    }

    atualizar() {
        console.log('atualizar', this.state)
    }

    handleEditar(campanha) {    
        const campanhaId = campanha.id
        const campanhaSearch = campanhas.filter((c) => c.id == campanhaId)        
        
        this.setState({
            id: campanhaSearch[0].id,
            nome: campanhaSearch[0].nome,
            data: campanhaSearch[0].data
        })

    }

    handleExcluir(campanha) {
        console.log(campanha)
    }

    render() {
        return (
            <Container title="Campanhas">
                <CampanhaForm data={this.state} 
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                <Table columns={columnsTable}
                    data={this.state.campanhas} actions={this.state.actions} />
            </Container>
        )
    }
}