import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Cliente from './views/cliente/Cliente.jsx'
import Campanha from './views/campanha/Campanha.jsx'
import Pedido from './views/pedido/Pedido.jsx'
import Venda from './views/venda/Venda.jsx'

export default props => (
    <Router history={hashHistory}>
        <Route path='/clientes' component={Cliente} />
        <Route path='/campanhas' component={Campanha} />
        <Route path='/pedidos' component={Pedido} />
        <Route path='/vendas' component={Venda} />
        <Redirect from='*' to='/clientes' />
    </Router>
)