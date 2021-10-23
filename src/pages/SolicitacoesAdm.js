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

export default function SolicitacoesAdm(){
  const { handleLogout, authenticated, admin } = useContext(Context)

  const [loading, setLoading] = useState("")
  const [solicitacoes, setSolicitacoes] = useState("")
  const [date, setDate] = useState("")
  const [refresh, setRefresh] = useState(true)
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("")
  const [success, setSuccess] = useState(false)
  const [successText, setSuccessText] = useState("")
  const [idUser, setIdUser] = useState("")

  useEffect(() => {
    console.log(date);
    setLoading(true)
    if(admin && authenticated){
      server
      .get('/payment')
      .then((res) => {
        setSolicitacoes(res.data)
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

  /* negar solicitação */
  const handleCancelPacks = (id) => {
    server
    .patch(`/payment-cancel/${id}`)
    .then((res)=> {
      setSuccessText("Solicitação cancelada com sucesso")
      setSuccess(true);
      setRefresh(!refresh)
    })
    .catch((err) => {
      if(err){
        setErr(true)
        setErrText("Erro ao cancelar solicitação!")
      }
    })
  };

  /* aprovar solicitacao */
  const handleAprovePacks = (id) => {
    server
    .patch(`/payment-aprove/${id}`)
    .then((res)=> {
      setSuccessText("Solicitação aprovada com sucesso")
      setSuccess(true);
      setRefresh(!refresh)
    })
    .catch((err) => {
      if(err){
        setErr(true)
        setErrText("Erro ao aprovar solicitação!")
      }
    })
  };

  return(
    <div>
      <Header/>
      <Div>
        <br/>
        <TextBold>Pagamentos esperando aprovação</TextBold>

        { !loading && solicitacoes &&
          <Container>
            {solicitacoes.map(s=>  
            <>
              <ContainerInline>
                <P>{s.name}</P>
                <P>
                  <ButtonTextClick id={s._id} onClick={() => handleAprovePacks(s._id)}><CheckIcon/></ButtonTextClick>
                  <ButtonTextClick id={s._id} onClick={() => handleCancelPacks(s._id)}><DeleteForeverIcon/></ButtonTextClick>
                </P>
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

