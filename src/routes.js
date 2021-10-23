import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './context/AuthContext';

import Text from './components/Text'

//importando os componentes
import Home from './pages/Home'
import Signin from './pages/Signin'
import HomePack from './pages/Homepack'
import Scheduling from './pages/Scheduling'
import MyAccount from './pages/MyAccount'
import Historic from './pages/Historic'
import HomeAdmin from './pages/HomeAdmin'
import PackAdm from './pages/PacotesAdm'
import DatesAdm from './pages/DatesAdm'
import SolicitacoesAdm from './pages/SolicitacoesAdm'
import CheckinAdm from './pages/CheckinAdm'


function CustomRoute({ isPrivate, isAdmin, ...rest }) {
    const { loading, authenticated, admin } = useContext(Context);

    if (loading)
      return <Text>Loading...</Text>;

    if ((isPrivate || isAdmin) && !authenticated) 
      return <Redirect to="/"/>
    
    if (isAdmin && !admin)
      return <Redirect to="/homePack"/>
    
  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute component={Home} path='/' exact/>
      <CustomRoute component={Signin} path='/signin' exac/>
      <CustomRoute isPrivate component={HomePack} path='/homePack' exact />
      <CustomRoute isPrivate component={Scheduling} path='/scheduling' />
      <CustomRoute isPrivate component={MyAccount} path='/myaccount' exact />
      <CustomRoute isPrivate component={Historic} path='/historic' exact />
      <CustomRoute isAdmin component={HomeAdmin} path='/homeAdmin' exact />
      <CustomRoute isAdmin component={PackAdm} path='/packAdmin' exact />
      <CustomRoute isAdmin component={DatesAdm} path='/datesAdmin' exact />
      <CustomRoute isAdmin component={SolicitacoesAdm} path='/solicitacoesAdmin' exact />
      <CustomRoute isAdmin component={CheckinAdm} path='/checkinAdmin' exact />
    </Switch>
  );
}

