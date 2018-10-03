import React, { Component } from 'react'
import Modal from '../../components/Modal.jsx'
import Button from '../../components/Button.jsx'
import api from '../../database/api.js'

const collectionNameVendas = 'vendas'

export default class VendaModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percentual: 0, ...props
        }
        this.salvarVenda = this.salvarVenda.bind(this)
    }
    
    componentWillReceiveProps(props) {                
        this.setState({ ...props })              
    }

    salvarVenda() {        
        this.setState({ displayContentModal: 'none' })
        const itensVenda = [...this.state.itensVenda]

        const percentItem = parseInt(100 / itensVenda.length)

        itensVenda.map((item, index) => {
            item.key = `${this.state.pedido}|${this.state.campanha}|${item.cliente}`
            item.pago = false
                     
            api.save(collectionNameVendas, item)
                .then(() => {                                               
                if (itensVenda.length == index + 1) {
                    this.setState({ 
                        styleProgressBar: { "width": '100%'}, percentual: '100%'
                    }) 
                    setTimeout(() => {
                        this.setState({ show: false, displayContentModal: 'block' })
                        this.state.dadosCadastrados()
                    }, 500)
                } else {
                    let percentString = `${parseInt(percentItem * (index+1))}%`                    
                    this.setState({ 
                        styleProgressBar: { "width": percentString},
                        percentual: percentString
                    }) 
                }
            })
            .catch(error => {
                console.log(error)                
            })
        })        
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
                                    aria-valuemin="0" aria-valuemax="100">{this.state.percentual}
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