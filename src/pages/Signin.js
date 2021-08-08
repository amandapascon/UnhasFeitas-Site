import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from 'styled-components'
import { Context } from '../context/AuthContext';
import history from '../history';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'
import Text from '../components/Text'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
`

export default function Signin(){
  const { authenticated, handleSignin, handleLogin } = useContext(Context);

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ err, setErr ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event) => {
    setErr(false);
  };

  const handleCloseSucces = (event) => {
    setSuccess(false);
  };

  useEffect(() => {    
    if(authenticated){
        history.push('/homePack');
    }
  }, []);

  async function handlesignin() {
    if (await handleSignin(name, phone, password))
      setErr(true)
    else
      setSuccess(true)    

    setName("")
    setPhone("")
    setPassword("")
  }

  return(
    <div>
      <Div>
        <Title>Unhas Feitas</Title>

        <Label label="Nome" value={name} onChange={event => setName(event.target.value)}></Label>
        <br></br>
        <Label label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }></Label>
        <br></br>
        <Label type="password" label="Senha" value={password} onChange={ event => setPassword(event.target.value) }></Label>

        <br></br><br></br>
        <Button onClick={()=>handlesignin()} color='#f7d0b7' textcolor='#222222'>Cadastrar </Button>
        <br></br>
        <Text textcolor='#545454'>Já possui cadastro? <ButtonText  textcolor='#e87b63' as={Link} to='/'>Entrar</ButtonText></Text>

        <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Erro ao cadastrar!
          </Alert>
        </Snackbar>

        <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSucces}>
          <Alert onClose={handleCloseSucces} severity="success">
            Cadastro realizado com sucesso!
          </Alert>
        </Snackbar>
          
      </Div>      
      <Footer/>
    </div>
    
     
  )
}

