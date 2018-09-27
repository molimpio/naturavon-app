import React, { Component } from 'react'
import Modal from '../../components/Modal.jsx'
import Button from '../../components/Button.jsx'

export default class VendaModal extends Component {
    constructor(props) {
        super(props)
        this.state = {...props.data}
        this.salvarVenda = this.salvarVenda.bind(this)
    }
    
    componentWillReceiveProps(props) {
        console.log(props.data)
        this.setState({ show: props.data.show })
    }

    salvarVenda() {
        console.log('salvar venda...')
        this.setState({ displayContentModal: 'none' })
        // const itensVenda = [...this.state.itensVenda]

        // const percentItem = parseInt(100 / itensVenda.length)
        // // TODO: colocar percent item no estado e setar na div do modal
        // itensVenda.map((item, index) => {
        //     item.key = `${this.state.pedido}|${this.state.campanha}|${this.state.cliente}`
        //     item.pago = false
        //     api.save(collectionNameVendas, item)
        //     .then(() => {                                               
        //         if (itensVenda.length == index + 1) {
        //             this.setState({
        //                 visibleAlert: true,
        //                 classeAlert: 'success',
        //                 messageAlert: 'Dados cadastrados com sucesso!',
        //                 styleProgressBar: { "width": '100%' },
        //                 displayContentModal: 'block',
        //                 showModal: false
        //             })
        //         } else {
        //             this.setState({
        //                 styleProgressBar: { "width": `${parseInt(percentItem * (index+1))}%` }
        //             }) 
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)                
        //     })
        // })        
    }

    render() {                
        return (
            this.state.show ? 
                <Modal>
                    {this.state.displayContentModal == 'none' ?
                        <div>
                            <h4 style={{ marginTop: "10px", marginBottom: "20px" }}
                                className="text-center">Salvando...</h4>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar"
                                    style={this.state.styleProgressBar} aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">{this.state.percentual}%
                                </div>
                            </div>
                        </div>
                        : null}
                    <div style={{ "display": this.state.displayContentModal }}>
                        <h4 className="d-flex justify-content-center">Deseja salvar os dados da Venda ?</h4>
                        <br />
                        <div className="row">
                            <div className="offset-md-2 col-4 d-flex justify-content-center">
                                <Button classe="danger" texto="Cancelar"
                                    icon="fa-remove" handleClick={() => this.setState({ show: false })} />
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <Button classe="success" texto="Salvar"
                                    icon="fa-check" handleClick={this.salvarVenda} />
                            </div>
                        </div>
                    </div>
                </Modal>
            : null
        )
    }
}