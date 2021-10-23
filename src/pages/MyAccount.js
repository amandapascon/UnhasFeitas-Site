import React, { useContext, useState, useEffect } from 'react';
import styles from 'styled-components'

import EditIcon from '@material-ui/icons/Edit'

import Header from '../components/Header'
import TextBold from '../components/TextBold'
import Text from '../components/Text'
import Button from '../components/Button'
import TabBar from '../components/TabBar'
import Label from '../components/Label'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import LabelReady from '../components/LabelReady'

import { Context } from '../context/AuthContext'
import { server } from '../api'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  justify-content: center;
`

export default function MyAccount(){
    const { handleLogout, authenticated } = useContext(Context);
    const [loading, setLoading] = useState("")

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [refresh, setRefresh] = useState(true)
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

    /* atualizar usuario */
    const handleUpadateUser = (event) => {
        console.log(name, phone);
        if(event){
            server
            .put(`/update`, {name:name, phone:phone})
            .then((res)=> {
                setSuccessText("Dados atualizados com sucesso")
                setSuccess(true)
                setRefresh(!refresh)
               
            })
            .catch((err) => {
                if(err){
                    console.log("Teste:"+refresh)
                    setErr(true)
                    setErrText("Erro ao atualizar Dados!")
                    setRefresh(!refresh)
                }
            })
        }
    }

    useEffect(() => {
        setLoading(true)  
        console.log("AAteste");  
        if(authenticated){
            server
            .get('/user')
            .then((res) => {
                setId(res.data._id)
                setName(res.data.name)
                setPhone(res.data.phone)
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
            <TextBold>Meu Perfil</TextBold>

            <br></br><br></br><br></br><br></br>

            {!loading && <Label label="Telefone" value={phone} onChange={ event => setPhone(event.target.value) }/>}
            <br></br>
            {!loading && <Label label="Nome" value={name} onChange={ event => setName(event.target.value) }/>}
            
            <br></br><br></br><br></br><br></br>
            <Button onClick={handleUpadateUser} color='#f7d0b7' textcolor='#222222'>Salvar Alterações</Button>

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

