import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Logon from './pages/Logon/index'
import Register from './pages/Register/index'
import Profile from './pages/Profile/index'
import NovoCaso from './pages/NovoCaso/index'

function Routes (){
  return (
    <BrowserRouter>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/casos/novo" component={NovoCaso}/>
    </BrowserRouter>
  )
}

export default Routes