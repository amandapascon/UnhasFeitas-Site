import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar'
import CheckboxLabel from '../components/CheckBoxLabel'

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
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    height: 100px;
    width: 70%;
    display: flex;
    flex-direction: column;
`

const ContainerNoBackgroung = styles.div`
    padding:5%;
    height: 100px;
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-bottom:20px;
`

const DivContainer = styles.div`
    display: flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default function Scheduling(){
    const { handleLogout, authenticated } = useContext(Context);
    const [loading, setLoading] = useState("")

    const [service, setService] = useState("")
    const [date, setDate] = useState("")
    const [statusScheduling, setStatusScheduling] = useState("")
    const [daySelected, setDaySelected] = React.useState("")

    const [dates, setDates] = useState("")
    
    const handleChange = (event) => {
      setDaySelected(event.target.value);
      console.log(event.target.value)
    };

    useEffect(() => {
        setLoading(true)    
        if(authenticated){
            server
            .get('/scheduling')
            .then((res) => {
                setDate(res.data.date)
                setService(res.data.services)
                setStatusScheduling(res.data.status)
            })

            server
            .get('/time')
            .then((res) => {
              setDates(res.data)
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
            <TextBold>Agendamento</TextBold>

            <br></br><br></br><br></br><br></br>

            {!loading && !service && 
              <ContainerNoBackgroung>
                <Text>Escolha os Serviços: </Text>
                {<CheckboxLabel label="PÉ" id="pe"/>}
                {<CheckboxLabel label="MÃO" id="mão"/>}
              </ContainerNoBackgroung>
            }

            {!loading && statusScheduling==="scheduled" &&
              <Container>
                <DivContainer>
                  <TextBold>{service}</TextBold>
                  <EventAvailableIcon/>
                </DivContainer>

                <DivContainer>
                  <Text>{dateFormat(date, "'às' h:MM TT")}</Text>
                  <Text>{dateFormat(date, "dd'/'mm'/'yyyy")}</Text>                  
                </DivContainer>

                <br></br><br></br><br></br>
                <Button color='#f7d0b7' textcolor='#222222'>Cancelar</Button>
              </Container> 

              
              
            }

              { dates &&
                <FormControl style={{width: '70%'}}>
                  <InputLabel >Escolha o dia do Atendimento</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={daySelected}
                    onChange={handleChange}
                  >
                    {dates.map(d=><MenuItem key={d._id}>{dateFormat(d.date, "dd'/'mm'/'yyyy")}</MenuItem>)}
                  </Select>
                </FormControl>
              }

            <br></br><br></br>{/* 
            <Select>Escolha um horário:</Select>
             */}


        </Div>      
        <TabBar/>
        </div>
        
        
    )
}


