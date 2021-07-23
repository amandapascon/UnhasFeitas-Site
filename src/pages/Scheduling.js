import React, { useContext } from 'react';
import styles from 'styled-components'

import Header from '../components/Header'
import Title from '../components/Title'
import Button from '../components/Button'
import TabBar from '../components/TabBar';

import { Context } from '../context/AuthContext';

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  justify-content: center;
`

export default function Scheduling(){

  return(
    <div>
      <Header/>
      <Div>        
        
        <h1>Agendamento</h1>

      </Div>      
      <TabBar/>
    </div>
    
     
  )
}

