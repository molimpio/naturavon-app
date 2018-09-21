import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Cliente from './views/cliente/Cliente.jsx'
import Campanha from './views/campanha/Campanha.jsx'

export default props => (
    <Router history={hashHistory}>
        <Route path='/clientes' component={Cliente} />
        <Route path='/campanhas' component={Campanha} />
        <Redirect from='*' to='/clientes' />
    </Router>
)