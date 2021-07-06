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

export default function HomePack(){
  return(
    <div>
      <Div>
        
        <Title>Unhas Feitas</Title>

        
 
      </Div>      
      <Footer/>
    </div>
    
     
  )
}

