import React from 'react'
import { Link } from 'react-router-dom'
import styles from 'styled-components'

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

export default function Signin(){
  return(
    <div>
      <Div>
        
        <Title>Unhas Feitas</Title>

        <Label label="Nome"></Label>
        <br></br>
        <Label label="Telefone"></Label>
        <br></br>
        <Label label="Senha"></Label>

        <br></br><br></br>
        <Button color='#f7d0b7' textcolor='#222222'>Cadastrar </Button>

        <ButtonText  textcolor='#e87b63' as={Link} to='/'>Login</ButtonText>
        
 
      </Div>      
      <Footer/>
    </div>
    
     
  )
}

