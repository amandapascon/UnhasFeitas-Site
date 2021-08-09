import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Header from '../components/Header'
import Circle from '../components/Circle';
import Text from '../components/Text';
import Button from '../components/Button'
import TabBar from '../components/TabBar';
import SimpleDialog from '../components/SimpleDialog'
import { Context } from '../context/AuthContext';
import { server } from '../api';

const Div = styles.div`
  align-items: center;   
  display: flex;
  padding-top: 180px;
  flex-direction: column;
  justify-content: center;
`

export default function HomePack(){
  const { handleLogout, authenticated } = useContext(Context);

  const [loading, setLoading] = useState("")
  const [name, setName] = useState("")
  const [statusUser, setStatusUser] = useState("")
  const [usage, setUsage] = useState(0)
  const [textbutton, setTextbutton] = useState("")
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [refresh, setRefresh] = useState("")
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")
  
  /* abrir pop up de pacotes disponíveis */
  const handlePacks = () => {
    setOpen(true);
  };

  /* solicitar cancelamento de pacote */
  const handleCancelPacks = () => {
    server
    .patch('/payment')
    .then((res)=> {
      setSuccessText("Pagamento cancelado com sucesso")
      setSuccess(true);
      setRefresh(!refresh)
    })
    .catch((err) => {
      if(err){
        setErr(true)
        setErrText("Erro ao cancelar pagamento!")
      }
    })
  };
  
  /* solocitar novo pacote */
  const handleNewPayament = (value) => {
    setOpen(false)    
    if(value){      
      setSelectedValue(value._id)
      const pack_id = value._id
      server
      .post(`/payment/package/${pack_id}`)
      .then((res)=> {
        setSuccessText("Pagamento solicitado com sucesso!")
        setSuccess(true);
        setRefresh(!refresh)
      })
      .catch((err) => {
        if(err){
          setErr(true)
          setErrText("Erro ao solicitar novo pagamento!")
        }
      })
    }
  };

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
    if(authenticated){
      server
      .get('/user')
      .then((res) => {
        setName(res.data.name)
        setStatusUser(res.data.status)        
         //tela 1 - primeira vez
        if(res.data.status === "unused"){
          setTextbutton("Iniciar novo pacote")
          setUsage(null)
        }
        //tela 2 - check payment
        if(res.data.status === "requested"){
          setText("AGUARDANDO CONFIRMAÇÃO DE PAGAMENTO")
          setTextbutton("Cancelar solicitação")
          setUsage(null)
        }
        //tela 3 - pacote ativo
        if(res.data.status === "using"){
          setText("PACOTE ATIVO")
          setTextbutton(null)
          setUsage(6-res.data.remainingPack)
        }
        //tela 4 - pacote finalizado
        if(res.data.status === "finished"){
          setText("PACOTE FINALIZADO")
          setTextbutton("Iniciar novo pacote")
          setUsage(6)
        }
        setLoading(false)        
      })
      .catch((err) => {
        if(err)
          handleLogout() 
      })
    }else{
      handleLogout() 
    } 
  }, [refresh]);
  
  return(
    <div>
      <Header/>
      <Div>
        <br></br><br></br><br></br>
        {!loading && <Text>Seja Bem-Vinda(o), {name}</Text>}
        <br></br><br></br><br></br><br></br><br></br>

        {!loading && (statusUser==="using" || statusUser==="finished") && <Circle>{usage}/6</Circle>}
        {!loading && statusUser!=="unused" && <Text>{text}</Text>}
        
        {!loading && (statusUser==="unused" || statusUser==="finished") && <Button color='#f7d0b7' textcolor='#222222' onClick={handlePacks}>{textbutton}</Button>}
        {!loading && statusUser==="requested" && <Button color='#f7d0b7' textcolor='#222222' onClick={handleCancelPacks}>{textbutton}</Button>}
        
        {/* Opções de Plano */}
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleNewPayament} />
        
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

