import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import CampanhaForm from '../campanha/CampanhaForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import storageCampanha from '../../database/storageCampanha'
import constantes from '../../constants.js'
import Modal from '../../components/Modal.jsx'

const columnsTable = ['ID', 'Nome', 'Ano']

export default class Campanha extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        storageCampanha.getAll()
            .then(campanhas => this.setState({ campanhas }))
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }))
    }

    initialState() {
        return {
            campanhas: [], nome: '', ano: new Date().getFullYear(),
            visibleAlert: false, codigoAlert: 0, loading: false
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        if (this.state.nome.length < 3)
            this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR })
        else this.save()
    }

    save() {
        this.setState({ loading: true })
        const campanha = {
            id: storageCampanha.getNextID(),
            ano: this.state.ano,
            nome: this.state.nome.trim().toUpperCase()
        }

        storageCampanha.save(campanha)
            .then(() => {
                const campanhas = [...this.state.campanhas]
                campanhas.push(campanha)
                this.setState({
                    campanhas, nome: '', ano: new Date().getFullYear(),
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

    render() {
        return (
            <Container title="Campanhas">
                <CampanhaForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {this.state.loading ? 
                    <Modal>
                        <h3 style={{textAlign: 'center'}}>Cadastrando Dados !</h3>
                        <Loading />
                    </Modal> : null}
                <Table columns={columnsTable}
                    data={this.state.campanhas}
                    actions={[]} />
            </Container>
        )
    }
}