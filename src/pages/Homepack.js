import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import Header from '../components/Header'
import Circle from '../components/Circle';
import Text from '../components/Text';
import Button from '../components/Button'
import ButtonText from '../components/ButtonText';
import TabBar from '../components/TabBar';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Context } from '../context/AuthContext';

import { server } from '../api';

const Div = styles.div`
  align-items: center;   
  display: flex;
  padding-top: 150px;
  flex-direction: column;
  justify-content: center;
`

export default function HomePack(){
  const { handleLogout, getUser, authenticated } = useContext(Context);

  const [name, setName] = useState("")
  const [pack, setPack] = useState("")
  const [usage, setUsage] = useState(0)

  useEffect(() => {
    if(authenticated){
      server
      .get('/user')
      .then((res) => {
        //nome do usuario
        setName(res.data.name)

        //SITUACAO DO PACOTE
        //primeira vez iniciando um pacote, apenas botao em tela
        if(res.data.pack === null & res.data.remainingPack !== -1){
          setPack("Iniciar novo pacote")
        //pacote ativo (pack!=null e remainingPack!=-1)
        }else if(res.data.pack !== null & res.data.remainingPack !== -1){
          setPack("PACOTE ATIVO")
        //pacote finalizado + botao pra novo pacote
        }else if(res.data.remainingPack === -1){
          setPack("PACOTE FINALIZADO")
        }
        //falta quando tiver uma solicitacao de pagamento para fazer

        //USO DO PACOTE
        if(res.data.remainingPack === null | res.data.remainingPack === 0){
          //nao tem o uso exibido em tela
          setUsage(false)
        }else if(res.data.remainingPack === -1){
          setUsage(6)
        }else{
          setUsage(res.data.remainingPack)
        }
        
      })
      .catch((err) => {
        if(err)
          handleLogout() 
      })
    }else{
      handleLogout() 
    }
  }, []);
  
  return(
    <div>
      <Header/>
      <Div>
        <ButtonText textcolor='#000' onClick={handleLogout}><ExitToAppIcon/></ButtonText>
        <br></br><br></br>
        <Text>Seja Bem-Vinda(o), {name}</Text> 
        <br></br><br></br><br></br><br></br><br></br>

        <Circle>{usage}/6</Circle>
        <br></br>
        <Text>{pack}</Text> 
        
        

      </Div>      
      <TabBar/>
    </div>
    
     
  )
}

