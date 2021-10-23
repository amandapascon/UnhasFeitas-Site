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
import FindInPageIcon from '@material-ui/icons/FindInPage'
import AddBoxIcon from '@material-ui/icons/AddBox';
import ButtonTextClick from '../components/ButtonTextClick';
import SimpleDialogPacks from '../components/SimpleDialogPack'
import Label from '../components/Label'
import { TextField } from '@material-ui/core';

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
  const [packs, setPacks] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")

  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ duration, setDuration ] = useState("")

  const handlePacks = () => {
    setOpen(true);
  }

  /* nova data */
  const handleCreatePack = (event) => { 
    console.log(name, description, duration);
    if(event){
        server
        .post('/package', {name: name, description: description, duration: duration})
        .then((res)=> {
            setSuccessText("Pacote cadastrado com sucesso")
            setSuccess(true)
            setRefresh(!refresh)
            setName("")
            setDuration("")
            setDescription("")
           
        })
        .catch((err) => {
            if(err){
                console.log("Teste:"+refresh)
                setErr(true)
                setErrText("Erro ao cadastrar Pacote!")
                setRefresh(!refresh)
            }
        })
    }
  }

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

  useEffect(() => {
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
  
  return(
    <div>
      <Header/>
      <Div>
        <br/>
        <ButtonTextClick onClick={handlePacks}><FindInPageIcon/></ButtonTextClick>        
        <Text>Ver Pacotes</Text>
        
        <br/>
        <Label label="Nome" value={name} onChange={event => setName(event.target.value)}></Label>
        <br/>
        <Label label="Descrição" value={description} onChange={event => setDescription(event.target.value)}></Label>
        <br/>
        <Label label="Duração" type="number" value={duration} onChange={event => setDuration(event.target.value)}></Label>
        <br/>
        <Button onClick={handleCreatePack} color='#f7d0b7' textcolor='#222222'>Cadastrar Pacote</Button>   

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

        <SimpleDialogPacks selectedValue={selectedValue} open={open} onClose={() => setOpen(false)} />
        
      </Div>      
      <TabBarAdm/>
    </div>
    
     
  )
}

