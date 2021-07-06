import React from 'react'
import ReactDOM from 'react-dom'
//para fazer spa, navegação sem recarregar a página
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

//importando os componentes
import Home from './pages/Home'
import Signin from './pages/Signin'
import HomePack from './pages/Homepack'
/* import Historic from './pages/Historic'
import Scheduling from './pages/Scheduling'
import HomeADM from './pages/HomeADM'
import Checkin from './pages/Checkin'
import Clients from './pages/Clients'
import Payments from './pages/Payments'
 */
//styles global
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route component={Home} path='/' exact/>
          <Route component={Signin} path='/signin' exact/>
          <Route component={HomePack} path='/homePack' exact/>
          {/* <Route component={Historic} path='/historic' exact/>
          <Route component={Scheduling} path='/Scheduling' exact/>
          <Route component={HomeADM} path='/HomeADM' exact/>
          <Route component={Checkin} path='/Checkin' exact/>
          <Route component={Clients} path='/Clients' exact/>
          <Route component={Payments} path='/Payments' exact/> */}
          <Redirect push={false} to='/' />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
