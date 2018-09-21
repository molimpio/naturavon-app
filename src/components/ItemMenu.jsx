import React from 'react'

export default props => {

    const itens = [
        { nome: 'Clientes', rota: 'clientes', icon: 'fa fa-user' },
        { nome: 'Campanhas', rota: 'campanhas', icon: 'fa fa-tags' },
        { nome: 'Pedidos', rota: 'pedidos', icon: 'fa fa-calculator' },
        { nome: 'Vendas', rota: 'vendas', icon: 'fa fa-credit-card-alt' }
    ];

    return itens.map((item, i) =>
        <li className='nav-item' key={i}>
            <a className="nav-link" href={`#/${item.rota}`}>
                <i className={item.icon} aria-hidden='true'></i>
                &nbsp;&nbsp;{item.nome}
            </a>
        </li>
    )
}
