import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../context/AuthContext'
import styles from 'styled-components'
import history from '../history'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

//componentes
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

export default function Home() {
  const { handleLogin, authenticated} = useContext(Context);

  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ err, setErr ] = useState(false)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event) => {
    setErr(false);
  };

  async function handlelogin() {
    if (await handleLogin(phone, password))
      setErr(true);
  }

  useEffect(() => {
    if(authenticated){
        history.push('/homePack');
    }
        
  }, []);

  return(
    <div>
        <Div>      
        <Title>Unhas Feitas</Title>

        <Label label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }/>
        <br></br>
        <Label label="Senha" value={password} onChange={ event => setPassword(event.target.value)} type="password" />

        <br></br><br></br>
        <Button onClick={()=>handlelogin()} color='#f7d0b7' textcolor='#222222'>Entrar</Button>
        <br></br>

        <Text textcolor='#545454'>Ainda não tem cadastro?<ButtonText textcolor='#e87b63' as={Link} to='/signin'>Cadastrar-se</ButtonText></Text>

        {err &&
          <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Telefone e/ou Senha incorretos!
            </Alert>
          </Snackbar>
        }
        
        <br></br>
        </Div>      
        <Footer/>
  </div>
  )
}