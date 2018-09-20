import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Cliente from './views/cliente/Cliente.jsx'

export default props => (
    <Router history={hashHistory}>
        <Route path='/clientes' component={Cliente} />
        <Redirect from='*' to='/clientes' />
    </Router>
)