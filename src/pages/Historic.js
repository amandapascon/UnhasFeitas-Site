import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import HistoryIcon from '@material-ui/icons/History'
import CheckIcon from '@material-ui/icons/Check';

import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar'
import Label from '../components/Label';
import LabelReady from '../components/LabelReady'

import { Context } from '../context/AuthContext'
import { server } from '../api'
import dateFormat from 'dateformat';

const Div = styles.div`
    align-items: center;   
    display: flex;
    flex-direction: column;
    padding-top: 150px;
`

const HistoricContainer = styles.div`
    display: flex;
    flex-direction: column;
`
const Container = styles.div`
    display: flex;
    flex-direction: row;
`
const P = styles.p`
    font-size: 15px;
    font-family: 'Text Me One', sans-serif;
    color: var(--black);

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
`


export default function Historic(){
    const { handleLogout, authenticated } = useContext(Context);
    const [loading, setLoading] = useState("")

    const [usages, setUsage] = useState([])
    const [dates, setDate] = useState([])
    const [length, setLength] = useState("")

    useEffect(() => {
        setLoading(true)    
        if(authenticated){
            server
            .get('/user')
            .then((res) => {
                setUsage(res.data.usageHistory)
                setDate(res.data.dateHistory)
                if(!res.data.dateHistory.length)
                    setLength(false)
                else
                    setLength(true)
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

            {!loading && length &&            
            <Container>
                <HistoricContainer>
                    {dates.map(date=><P key={date}><HistoryIcon/>&nbsp;&nbsp;{dateFormat(date, "dd'/'mm'/'yyyy")}</P>)}
                </HistoricContainer>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <HistoricContainer>
                    {usages.map(usage=><P key={usage}>{usage}&nbsp;&nbsp;&nbsp;&nbsp;<CheckIcon/></P>)}  
                </HistoricContainer>
            </Container>
            }

            {!loading && !length && <center><Text>A SITUAÇÃO DO SEU PACOTE NÃO PERMITE VISUALIZAÇÃO DO HISTÓRICO</Text></center>}

        </Div>      
        <TabBar/>
        </div>
    )
}

