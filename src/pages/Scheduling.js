import React, { useContext, useState, useEffect } from 'react'
import styles from 'styled-components'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { Context } from '../context/AuthContext'
import { server } from '../api'
import dateFormat from 'dateformat'

const Div = styles.div`
    align-items: center;   
    display: flex;
    flex-direction: column;
    padding-top: 150px;
`
const Container = styles.div`
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    height: 90px;
    width: 70%;
    padding:5%;
    display: flex;
    flex-direction: column;
`
const DivContainer = styles.div`
    display: flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const services = ["Mão", "Pé"]

export default function Scheduling(){
  const { handleLogout, authenticated } = useContext(Context);
  const [loading, setLoading] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [idScheduling, setIdScheduling] = useState("")
  const [statusScheduling, setStatusScheduling] = useState("")
  const [dates, setDates] = useState([])
  const [daySelected, setDaySelected] = useState("")
  const [timeSelected, setTimeSelected] = useState("")
  const [servicePerson, setServicePerson] = useState([])
  const [statusUser, setStatusUser] = useState("")
  const [refresh, setRefresh] = useState("")
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")

  /* alerta de sucesso ou erro */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleCloseErr = (event) => {
    setErr(false);
  };
  const handleCloseSucces = (event) => {
    setSuccess(false);
  };
    
  /* pegar o dia selecionado do popup */
  const handleChangeDay = (event) => {
    setDaySelected(event.target.value);
    console.log(event.target.value)
  }

  /* pegar o horário selecionado do popup */
  const handleChangeTime = (event) => {
    setTimeSelected(event.target.value);
    console.log("Time:"+event.target.value)
  }

  /* pegar serviço de pé e/ou mão */
  const handleChange = (event) => {
    setServicePerson(event.target.value)
    console.log("Service:"+(event.target.value).join())
  }

  /* novo agendamento */
  const handleNewScheduling = (event) => {
    if(event){
      server
      .post('/scheduling', {date:timeSelected, services:servicePerson})
      .then((res)=> {
        setSuccessText("Agendamento realizado com sucesso")
        setSuccess(true);
        setRefresh(!refresh)
      })
      .catch((err) => {
        if(err){
          setErr(true)
          setErrText("Erro ao realizar Agendamento!")
        }
      })
    }
  }

  /* cancelar agendamento */
  const handleCancelScheduling = (event) => {
    if(event){
      const id = idScheduling
      server
      .patch(`/scheduling/${id}`)
      .then((res)=> {
        setSuccessText("Agendamento cancelado com sucesso")
        setSuccess(true);
        setRefresh(!refresh)
      })
      .catch((err) => {
        if(err){
          setErr(true)
          setErrText("Erro ao cancelar Agendamento!")
        }
      })
    }
  }

  function TimesGrid(dates){
    let groups = new Map()
    dates.forEach((d) => {
      let group_id = dateFormat(d.date, "dd'/'mm'/'yyyy")
      if(!groups.get(group_id))
        groups.set(group_id, { date: dateFormat(d.date, "dd'/'mm'/'yyyy"), times: [] })
      let group = groups.get(group_id)
      group.times.push(d.date)
    })
    groups = Array.from(groups).map((group) => group[1])
    return groups
  }

  useEffect(() => {
    setLoading(true)    
    if(authenticated){
      server
      .get('/scheduling')
      .then((res) => {
        setIdScheduling(res.data._id)
        setDate(res.data.date)
        setService(res.data.services)
        setStatusScheduling(res.data.status)
      })
      server
      .get('/time')
      .then((res) => {
        setDates(TimesGrid(res.data))       
      })
      server
      .get('/user')
      .then((res) => {
        setStatusUser(res.data.status)
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
          <TextBold>Agendamento</TextBold>
          <br /><br/>

          {/* fazer agendamento */}
          {!loading && statusScheduling!=="scheduled" && statusUser==="using" && 
            <>
            <FormControl style={{width: '70%'}}>
              <InputLabel>Escolha os Serviços: </InputLabel>
              <Select
                multiple
                value={servicePerson}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox checked={servicePerson.indexOf(service) > -1} />
                    <ListItemText primary={service} />
                  </MenuItem>
                ))}
              </Select>
            <br /><br />
            </FormControl>

            { !loading && statusUser==="using" && dates.length!==0 &&
              <FormControl style={{width: '70%'}}>
              <InputLabel >Escolha o dia do Atendimento:</InputLabel>
              <Select
                value={daySelected}
                onChange={handleChangeDay}
              >
                {
                  dates.map(d=>
                    <MenuItem key={d.date} value={d.date}>{d.date}</MenuItem>    
                )}              
              </Select>
            <br />
            </FormControl>
            }

            {
              !loading && statusUser==="using" && dates.length!==0 && daySelected &&
              <FormControl style={{width: '70%'}}>
                <InputLabel >Escolha o Horário:</InputLabel>
                <Select
                  value={timeSelected}
                  onChange={handleChangeTime}
                >
                  {
                    dates.filter((d)=>
                    d.date===daySelected).map((d)=>
                    d.times.map((t)=>
                    <MenuItem key={t} value={t}>{dateFormat(t, "HH:MM")}</MenuItem>))
                  }       
                             
                </Select>
              </FormControl>
            }
            
            <br /><br />
            <Button onClick={handleNewScheduling} color='#f7d0b7' textcolor='#222222'>Agendar</Button>
            </>
          }
          
          {/* agendamento existente */}
          {!loading && statusUser==="using" && statusScheduling==="scheduled" &&
            <Container>
              <DivContainer>
                <TextBold>{service}</TextBold>
                <EventAvailableIcon/>
              </DivContainer>

              <DivContainer>
                <Text>{dateFormat(date, "'às' h:MM TT")}</Text>
                <Text>{dateFormat(date, "'dia' dd'/'mm'/'yyyy")}</Text>                  
              </DivContainer>

              <br></br><br></br><br></br>
              <Button onClick={handleCancelScheduling} color='#f7d0b7' textcolor='#222222'>Cancelar</Button>
            </Container> 
          }

          {
            !loading && statusUser!=="using" && 
            <center>
              <Text>A SITUAÇÃO DO SEU PACOTE NÃO PERMITE AGENDAMENTO</Text>
            </center>
          }

        <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSucces}>
          <Alert onClose={handleCloseSucces} severity="success">
            {successText}
          </Alert>
        </Snackbar>
      
        <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
          <Alert onClose={handleCloseErr} severity="error">
            {errText}
          </Alert>
        </Snackbar>

        </Div>      
        <TabBar/>
        </div>
        
        
    )
}


