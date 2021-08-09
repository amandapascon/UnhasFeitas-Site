import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
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
  const [dates, setDates] = useState("")
  const [daySelected, setDaySelected] = useState("")
  const [timeSelected, setTimeSelected] = useState("")
  const [feet, setFeet] = useState("")
  const [hand, setHand] = useState("")
    
  /* pegar o dia selecionado do popup */
  const handleChangeDay = (event) => {
    setDaySelected(event.target.value);
    console.log(event.target.value)
  };

  /* pegar o horário selecionado do popup */
  const handleChangeTime = (event) => {
    setTimeSelected(event.target.value);
    console.log(event.target.value)
  };

  /* pegar serviço de mão */
  const handleChangeFeet = (event) => {
    setHand(event.target.value);
    console.log(event.target.value)
  };

  /* pegar serviço de pé */
  const handleChangeHand = (event) => {
    setFeet(event.target.value);
    console.log(event.target.value)
  };

  /* novo agendamento */
  const handleNewScheduling = (event) => {
    feet(event.target.value);
    console.log(event.target.value)
  };

  /* cancelar agendamento */
  const handleCancelScheduling = (event) => {
    feet(event.target.value);
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
          <br />

          {/* fazer agendamento */}
          {!loading && statusScheduling!=="scheduled"  && 
            <>
            <ContainerNoBackgroung>
              <Text>Escolha os Serviços: </Text>
              {<CheckboxLabel checked={feet} onChange={handleChangeFeet} label="PÉ" id="pe"/>}
              {<CheckboxLabel onChange={handleChangeHand} label="MÃO" id="mão"/>}
            </ContainerNoBackgroung>
            <br />
            {dates &&
              <FormControl style={{width: '70%'}}>
                <InputLabel >Escolha o dia do Atendimento:</InputLabel>
                <Select
                  value={daySelected}
                  onChange={handleChangeDay}
                >
                  {dates.map(d=>
                    <MenuItem key={d._id} value={dateFormat(d.date, "dd'/'mm'/'yyyy")}>{dateFormat(d.date, "dd'/'mm'/'yyyy")}</MenuItem>
                  )}
                </Select>
              <br />
              </FormControl>
            }
            {daySelected &&
              <FormControl style={{width: '70%'}}>
                <InputLabel >Escolha o Hoŕario:</InputLabel>
                <Select
                  value={timeSelected}
                  onChange={handleChangeTime}
                >
                  {dates.map(t=>
                    dateFormat(t.date, "dd'/'mm'/'yyyy")===daySelected &&
                    <MenuItem key={t._id} value={dateFormat(t.date, "HH:MM")}>{dateFormat(t.date, "HH:MM")}</MenuItem>
                  )}
                </Select>
              </FormControl>
            }
            <br /><br />
            <Button color='#f7d0b7' textcolor='#222222' >Agendar</Button>
            </>
          }
          
          {/* agendamento existente */}
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

        </Div>      
        <TabBar/>
        </div>
        
        
    )
}


