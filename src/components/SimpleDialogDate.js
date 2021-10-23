import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Context } from '../context/AuthContext'
import { server } from '../api'
import dateFormat from 'dateformat'

export default function SimpleDialog(props) {
    const { handleLogout, authenticated } = useContext(Context);
    const { onClose, selectedValue, open } = props;    
    const [dates, setDates] = useState([])

    useEffect(() => {    
        if(authenticated){  
          server
          .get('/time')
          .then((res)=> {
            setDates(res.data)
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
        <DialogTitle id="simple-dialog-title">Horarios Cadastrados: </DialogTitle>
        <List>
          {dates.map((date) => (
            <ListItem key={date._id} button onClick={() => handleListItemClick(date)}>
              
              <ListItemText key={date._id} primary={dateFormat(date.date, "'dia' dd'/'mm'/'yyyy 'às' h:MM TT")} />
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
  