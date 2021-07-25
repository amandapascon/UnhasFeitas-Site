import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import Header from '../components/Header'
import TextBold from '../components/TextBold';
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar';

import { Context } from '../context/AuthContext';
import { server } from '../api';

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
  padding-top: 100px;
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
    }, []);

    return(
        <div>
        <Header/>
        <Div>                
            <TextBold>Meu Perfil</TextBold>

            <Text>{name}</Text>
            <Text>{phone}</Text>

        </Div>      
        <TabBar/>
        </div>
        
        
    )
}

