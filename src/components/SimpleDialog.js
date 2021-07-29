import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import { Context } from '../context/AuthContext'
import { server } from '../api'

export default function SimpleDialog(props) {
    const { handleLogout, authenticated } = useContext(Context);
    
    const [loading, setLoading] = useState("")
    const [packs, setPacks] = useState([])

    useEffect(() => {

        setLoading(true)
    
        if(authenticated){  
          server
          .get('/package')
          .then((res)=> {
            setPacks(res.data)
          })    
        }else{
          handleLogout() 
        }
      }, []);

    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Escolha seu Pacote: </DialogTitle>
        <List>
          {packs.map((pack) => (
            <ListItem button onClick={() => handleListItemClick(pack)} key={pack.id}>
              
              <ListItemText primary={pack.name} />
            </ListItem>
          ))}
  
          
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  