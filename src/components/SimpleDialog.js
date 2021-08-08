import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Context } from '../context/AuthContext'
import { server } from '../api'

export default function SimpleDialog(props) {
    const { handleLogout, authenticated } = useContext(Context);
    const { onClose, selectedValue, open } = props;
    
    const [packs, setPacks] = useState([])

    useEffect(() => {    
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
            <ListItem key={pack._id} button onClick={() => handleListItemClick(pack)}>
              
              <ListItemText key={pack._id} primary={pack.name} />
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
  