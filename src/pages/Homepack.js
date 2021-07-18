import React from 'react'
import styles from 'styled-components'

import Footer from '../components/Footer'
import Title from '../components/Title'
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

