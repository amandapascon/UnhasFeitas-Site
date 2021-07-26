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
import Historic from './pages/Historic';
/* import Historic from './pages/Historic'
import HomeADM from './pages/HomeADM'
import Checkin from './pages/Checkin'
import Clients from './pages/Clients'
import Payments from './pages/Payments'
 */

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(Context);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (isPrivate && !authenticated) 
        return <Redirect to="/"/>
    
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
    </Switch>
  );
}

