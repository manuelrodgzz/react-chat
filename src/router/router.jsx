import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from '../views/Login'
import Chat from '../views/Chat'

const Rutas = () =>{

    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact render={() => (<Redirect to='/login' />)} />
                <Route path='/login' exact component={Login} />
                <Route path='/chat' exact component={Chat} />
                <Route render={() => (<div>La página que solicitaste no existe :(</div>)} />
            </Switch>
        </BrowserRouter>
    )
}

export default Rutas