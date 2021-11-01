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
import SimpleDialogDate from '../components/SimpleDialogDate'
import { Context } from '../context/AuthContext';
import { server } from '../api';
import TextField from '@material-ui/core/TextField';
import FindInPageIcon from '@material-ui/icons/FindInPage'
import ButtonTextClick from '../components/ButtonTextClick';

const Div = styles.div`
  align-items: center;   
  display: flex;
  padding-top: 180px;
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;
`

export default function DateAdm(){
  const { handleLogout, authenticated, admin } = useContext(Context)

  const [loading, setLoading] = useState("")
  const [packs, setPacks] = useState("")
  const [date, setDate] = useState("")
  const [refresh, setRefresh] = useState(true)
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")

  /* abrir pop up de novo horario */
  const handleDates = () => {
    setOpen(true);
  }

  useEffect(() => {
    console.log(date);
    setLoading(true)
    if(admin && authenticated){
      server
      .get('/package')
      .then((res) => {
        setPacks(res.data)
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

  /* nova data */
  const handleCreateDate = (event) => {
    setOpen(false)  
    if(event){
        server
        .post(`/time`, {date:date})
        .then((res)=> {
            setSuccessText("Horário cadastrado com sucesso")
            setSuccess(true)
            setRefresh(!refresh)
           
        })
        .catch((err) => {
            if(err){
                console.log("Teste:"+refresh)
                setErr(true)
                setErrText("Erro ao cadastrar Horário!")
                setRefresh(!refresh)
            }
        })
    }
  }
  
  return(
    <div>
      <Header/>
      <Div>
        <br/>
        <ButtonTextClick onClick={handleDates}><FindInPageIcon/></ButtonTextClick>        
        <Text>Ver Horários</Text>

        <br/><br/>
        <form noValidate>
        <TextField
            id="datetime-local"
            label="Cadastrar Novo Horário"
            type="datetime-local"
            defaultValue=""
            onChange={ event => setDate(event.target.value) }
            InputLabelProps={{
            shrink: true,
            }}
            
        />
        </form>
        <br/><br/>
        <Button onClick={handleCreateDate} color='#f7d0b7' textcolor='#222222'>Cadastrar Horário</Button>

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

        <SimpleDialogDate selectedValue={selectedValue} open={open} onClose={handleCreateDate} />

      </Div>      
      <TabBarAdm/>
    </div>
    
     
  )
}

