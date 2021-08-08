import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import HistoryIcon from '@material-ui/icons/History'

import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import TabBar from '../components/TabBar'

import { Context } from '../context/AuthContext'
import { server } from '../api'
import dateFormat from 'dateformat';

const Div = styles.div`
    align-items: center;   
    display: flex;
    flex-direction: column;
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
    justify-content: space-around;
    align-items: center; 
    box-shadow: 0px 2px 5px rgba(0,0,0,0.6);
    background: var(--white);
    height: 50px;
    width: 90%;
    margin-top:20px;
`

const P = styles.p`
    font-size: 15px;
    font-family: 'Text Me One', sans-serif;
    color: var(--black);

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`


export default function Historic(){
    const { handleLogout, authenticated } = useContext(Context);

    const [loading, setLoading] = useState("")

    const [ schedulings, setSchedulings ] = useState("")
    const [statusUser, setStatusUser] = useState("")

    useEffect(() => {
        setLoading(true)    
        if(authenticated){
            server
            .get('/user')
            .then((res) => {
                setStatusUser(res.data.status)
                console.log(res.data.status)
            })

            server
            .get('/historic')
            .then((res) => {
                setSchedulings(res.data)
                console.log(res.data)
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
            <TextBold>Histórico</TextBold>

            <br></br><br></br><br></br><br></br>

            { !loading && schedulings &&
            <Container>
                {schedulings.map(scheduling=>  
                <>                  
                    {
                        scheduling.status==="confirmed" &&
                        <ContainerInline>
                            <P>
                                <HistoryIcon/>
                                &nbsp;&nbsp;
                                <TextBold>{scheduling.services}</TextBold>
                            </P>
                            <P>{dateFormat(scheduling.date, "dd'/'mm'/'yyyy")}</P>
                        </ContainerInline>
                    }
                </>
                )}
            </Container> 
            }

            {!loading && (statusUser!=="using" && statusUser!=="finished") && <center><Text>A SITUAÇÃO DO SEU PACOTE NÃO PERMITE VISUALIZAÇÃO DO HISTÓRICO</Text></center>}

        </Div>      
        <TabBar/>
        </div>
    )
}

