import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import Header from '../components/Header'
import Circle from '../components/Circle';
import TextBold from '../components/TextBold';
import Text from '../components/Text';
import Button from '../components/Button'
import ButtonText from '../components/ButtonText';
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
const Icone = styles.div`
    color: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Text Me One', sans-serif;
    font-size: 12px;
`

export default function HomePack(){
  const { handleLogout, authenticated } = useContext(Context);
  const [loading, setLoading] = useState("")

  const [name, setName] = useState("")
  const [pack, setPack] = useState("")
  const [remaining, setRemaining] = useState("")

  const [usage, setUsage] = useState(0)
  const [textbutton, setTextbutton] = useState("")
  const [text, setText] = useState("")

  const [packs, setPacks] = useState("")

  const [ err, setErr ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseErr = (event) => {
    setErr(false);
  };

  const handleCloseSucces = (event) => {
    setSuccess(false);
  };

  async function handleNewPay(){
    console.log(pack)
    /* server
    .post('/payment/package/${pack}')
    .then((res)=> {
      setSuccess(true);
    })
    .catch((err) => {
      if(err)
        setErr(true)
    }) */
  }

  useEffect(() => {

    setLoading(true)

    if(authenticated){
      server
      .get('/user')
      .then((res) => {

        setName(res.data.name)
        setPack(res.data.pack)
        setRemaining(res.data.remainingPack)
        
         //tela 1 - primeira vez
        if(res.data.pack === null & res.data.remainingPack !== -1){
          setTextbutton("Iniciar novo pacote")
          setUsage(null)
        }

        //tela 2 - check payment

        //tela 3 - pacote ativo
        if(res.data.pack !== null & res.data.remainingPack !== -1){
          setText("PACOTE ATIVO")
          setTextbutton(null)
          setUsage(6-res.data.remainingPack)
        }

        //tela 4 - pacote finalizado
        if(res.data.pack !== null & res.data.remainingPack === -1){
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

    if(selectedValue){
      /* server
        .get('/package')
        .then((res)=> {
          console.log(res.data)
          setPacks(res.data)
        }) */
        console.log(selectedValue)
    }

  }, []);
  
  return(
    <div>
      <Header/>
      <Div>
        <br></br><br></br><br></br>

        {!loading && <Text>Seja Bem-Vinda(o), {name}</Text>}
        <br></br><br></br><br></br><br></br><br></br>

        {!loading && pack && <Circle>{usage}/6</Circle>}
        {!loading && pack && <Text>{text}</Text>}
        {!loading && !pack && remaining!==-1 && <Button color='#f7d0b7' textcolor='#222222' onClick={handleClickOpen}>{textbutton}</Button>}
        {!loading && !pack && remaining===-1 && <Button color='#f7d0b7' textcolor='#222222'>{textbutton}</Button>}

        {success &&
          <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSucces}>
            <Alert onClose={handleCloseSucces} severity="success">
              Pagamento solicitado com sucesso!
            </Alert>
          </Snackbar>
        }

        {err &&
          <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
            <Alert onClose={handleCloseErr} severity="error">
              Erro ao solicitar novo pagamento!
            </Alert>
          </Snackbar>
        }
    
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    
      </Div>      
      <TabBar/>
    </div>
    
     
  )
}

