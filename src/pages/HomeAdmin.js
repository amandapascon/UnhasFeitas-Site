import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Header from '../components/Header'
import Circle from '../components/Circle';
import Text from '../components/Text';
import TextBold from '../components/TextBold'
import Button from '../components/Button'
import TabBarAdm from '../components/TabBarAdm';
import SimpleDialog from '../components/SimpleDialog'
import { Context } from '../context/AuthContext';
import { server } from '../api';

const Div = styles.div`
  align-items: center;   
  display: flex;
  padding-top: 180px;
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;
`
const Container = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 100%;
`
const ContainerInline = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
    box-shadow: 0px 2px 5px rgba(0,0,0,0.6);
    background: var(--white);
    border-radius: 10px;
    height: 35px;
    width: 80%;
    padding:2%;
    margin-top:20px;
`
const P = styles.p`
    font-size: 15px;
    font-family: 'Text Me One', sans-serif;
    color: var(--black);

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
`

export default function HomePack(){
  const { handleLogout, authenticated, admin } = useContext(Context)

  const [loading, setLoading] = useState("")
  const [refresh, setRefresh] = useState("")
  const [users, setUsers] = useState("")

  useEffect(() => {
    setLoading(true)
    if(admin && authenticated){
      server
      .get('/users')
      .then((res) => {
        setUsers(res.data)
      })
    }else{
      handleLogout() 
    } 
    setLoading(false)
  }, [refresh]);
  
  return(
    <div>
      <Header/>
      <Div>
        <br/>
        <TextBold>Usuários Cadastrados</TextBold>
        

        { !loading && users &&
          <Container>
            {users.map(user=>  
            <>
              <ContainerInline>
                <P>{user.name}</P>
                <P>{user.phone}</P>
              </ContainerInline>
            </>
            )}
          </Container> 
        }
        
      </Div>      
      <TabBarAdm/>
    </div>
    
     
  )
}

