import React, { useContext } from 'react';
import styles from 'styled-components'

import ButtonCliclk from './ButtonTextClick'
import Button from './ButtonText';
import { Link } from 'react-router-dom'
import { Context } from '../context/AuthContext'

import PersonIcon from '@material-ui/icons/Person'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import ListAltIcon from '@material-ui/icons/ListAlt'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import EventNoteIcon from '@material-ui/icons/EventNote';

import HistoryIcon from '@material-ui/icons/History'
import TodayIcon from '@material-ui/icons/Today'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const Tabbar = styles.div`
    background-color : var(--white);
    height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    box-shadow: 0 0 1em var(--lightgrey);
    
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 100;
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

export default function TabBar(){
    const { handleLogout } = useContext(Context);
    return(
        <Tabbar>
            <Button textcolor='#000' as={Link} to='/homeAdmin'><Icone><PersonIcon/>Clientes</Icone></Button>
            <Button textcolor='#000' as={Link} to='/packAdmin'><Icone><LocalMallIcon/>Pacotes</Icone></Button>
            <Button textcolor='#000' as={Link} to='/solicitacoesAdmin'><Icone><ListAltIcon/>Solicitações</Icone></Button>
            <Button textcolor='#000' as={Link} to='/checkinAdmin'><Icone><CheckCircleOutlineIcon/>Check-ins</Icone></Button>
            <Button textcolor='#000' as={Link} to='/datesAdmin'><Icone><EventNoteIcon/>Horários</Icone></Button>
            <ButtonCliclk textcolor='#000' onClick={handleLogout}><Icone><ExitToAppIcon/>Sair</Icone></ButtonCliclk>
        </Tabbar>
    )
}