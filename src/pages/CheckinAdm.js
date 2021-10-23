import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Header from '../components/Header'
import Circle from '../components/Circle';
import Text from '../components/Text';
import TextBold from '../components/TextBold'
import Button from '../components/Button'
import ButtonTextClick from '../components/ButtonTextClick';
import TabBarAdm from '../components/TabBarAdm';
import SimpleDialog from '../components/SimpleDialog'
import { Context } from '../context/AuthContext';
import { server } from '../api';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import dateFormat from 'dateformat'

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
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 90px;
  width: 70%;
  padding:5%;
  display: flex;
  flex-direction: column;
  margin-top:20px;
`

const Inside = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
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
const DivContainer = styles.div`
    display: flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default function CheckinAdm(){
  const { handleLogout, authenticated, admin } = useContext(Context)

  const [loading, setLoading] = useState("")
  const [checkins, setCheckins] = useState("")
  const [date, setDate] = useState("")
  const [refresh, setRefresh] = useState(true)
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    console.log(date);
    setLoading(true)
    if(admin && authenticated){
      server
      .get('/schedulings')
      .then((res) => {
        setCheckins(res.data)
      })
    }else{
      handleLogout() 
    } 
    setLoading(false)
  }, [refresh]);

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

  const nameUser = (id) => {
    server
    .get(`/user/${id}`)
    .then((res)=> {
      return(res.data.name)
    })
  };  

  /* cancelar agendamento */
  const handleCancelPacks = (id) => {
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
        setErrText("Erro ao cancelar agendamento!")
      }
    })
  };

  /* confirmar agendamento */
  const handleAprovePacks = (id) => {
    server
    .patch(`/checkin/${id}`)
    .then((res)=> {
      setSuccessText("Agendamento confirmado com sucesso")
      setSuccess(true);
      setRefresh(!refresh)
    })
    .catch((err) => {
      if(err){
        setErr(true)
        setErrText("Erro ao confirmar agendamento!")
      }
    })
  };

  return(
    <div>
      <Header/>
      <Div>
        <br/>
        <TextBold>Check-ins esperando confirmação</TextBold>

        { !loading && checkins &&
          <Container>
            {checkins.map(c=>  
            <>
              <ContainerInline>
                <Inside>
                
                <Text>{c.user.name}</Text>
                <P>
                  <ButtonTextClick id={c._id} onClick={() => handleAprovePacks(c._id)}><CheckIcon/></ButtonTextClick>
                  <ButtonTextClick id={c._id} onClick={() => handleCancelPacks(c._id)}><DeleteForeverIcon/></ButtonTextClick>
                </P>
                </Inside>
                <Inside>
                <Text>{c.services}</Text>
                <Text>{dateFormat(c.date, "'dia' dd'/'mm'/'yyyy 'às' h:MM TT")}</Text>
                </Inside>                 
              </ContainerInline>              
            </>
            )}
          </Container> 
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
      <TabBarAdm/>
    </div>
    
     
  )
}

