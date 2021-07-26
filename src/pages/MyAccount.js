import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import EditIcon from '@material-ui/icons/Edit';

import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar'
import Label from '../components/Label';
import LabelReady from '../components/LabelReady'

import { Context } from '../context/AuthContext'
import { server } from '../api'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  justify-content: center;
`

export default function MyAccount(){
    const { handleLogout, authenticated } = useContext(Context);
    const [loading, setLoading] = useState("")

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        setLoading(true)    
        if(authenticated){
            server
            .get('/user')
            .then((res) => {
                setName(res.data.name)
                setPhone(res.data.phone)
            })
        }else{
            handleLogout() 
        }   
        setLoading(false)     
    }, []);

    return(
        <div>
        <Header/>
        <Div>                
            <TextBold>Meu Perfil</TextBold>

            <br></br><br></br><br></br><br></br>

            {!loading && <LabelReady label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }/>}
            <br></br>
            {!loading && <LabelReady label="Nome" value={name} onChange={ event => setName(event.target.value) }/>}
            
            <br></br><br></br><br></br><br></br>
            <Button color='#f7d0b7' textcolor='#222222'>Salvar Alterações</Button>
            

        </Div>      
        <TabBar/>
        </div>
        
        
    )
}

