import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from 'styled-components'
import { Context } from '../context/AuthContext';
import history from '../history';

import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
`

export default function Signin(){
  const { authenticated, handleSignin, handleLogin } = useContext(Context);

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ err, setErr ] = useState('')

  useEffect(() => {    
    if(authenticated){
        history.push('/homePack');
    }
  }, []);

  async function handlesignin() {
    await handleSignin(name, phone, password)
  }

  return(
    <div>
      <Div>        
        <Title>Unhas Feitas</Title>

        <Label label="Nome" value={name} onChange={event => setName(event.target.value)}></Label>
        <br></br>
        <Label label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }></Label>
        <br></br>
        <Label type="password" label="Senha" value={password} onChange={ event => setPassword(event.target.value) }></Label>

        <br></br><br></br>
        <Button onClick={()=>handlesignin()} color='#f7d0b7' textcolor='#222222'>Cadastrar </Button>

        <ButtonText  textcolor='#e87b63' as={Link} to='/'>Login</ButtonText>       
      </Div>      
      <Footer/>
    </div>
    
     
  )
}

