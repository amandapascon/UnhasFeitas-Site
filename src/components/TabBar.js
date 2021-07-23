import React from 'react';
import styles from 'styled-components'

import { Link } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import TodayIcon from '@material-ui/icons/Today';
import HomeIcon from '@material-ui/icons/Home';

const Tabbar = styles.div`
    background-color : var(--white);
    height: 70px;
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
    return(
        <Tabbar>
            <Icone><HomeIcon/>Home</Icone>
            <Icone><TodayIcon/>Agendamento</Icone>
            <Icone><HistoryIcon/>Histórico</Icone>
            <Icone><PersonIcon/>Perfil</Icone>
        </Tabbar>
    )
}