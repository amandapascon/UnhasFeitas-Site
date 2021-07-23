import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from 'styled-components'

import { Context } from '../context/AuthContext';
import history from '../history';

//componentes
import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'
import Text from '../components/Text'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
`

export default function Home() {
  const { handleLogin, authenticated} = useContext(Context);

  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ err, setErr ] = useState('')

  async function Login() {
    await handleLogin(phone, password)
  }

  useEffect(() => {

    console.log()
    if(authenticated){
        history.push('/homePack');
    }
        
  }, []);

  return(
    <div>
        <Div>      
        <Title>Unhas Feitas</Title>

        {err && <Text textcolor='#f00'>Telefone ou Usuário incorretos!</Text>}

        <Label label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }/>
        <br></br>
        <Label label="Senha" value={password} onChange={ event => setPassword(event.target.value)} type="password" />

        <br></br><br></br>
        <Button onClick={()=>Login()} color='#f7d0b7' textcolor='#222222'>Login</Button>
        <br></br>

        <Text textcolor='#545454'>Ainda não tem cadastro?</Text>
        <ButtonText textcolor='#e87b63' as={Link} to='/signin'>SignUp</ButtonText>
        <br></br>
        </Div>      
        <Footer/>
  </div>
  )
}