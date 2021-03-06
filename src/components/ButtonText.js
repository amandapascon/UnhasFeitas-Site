import React from 'react'
import styles from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonLink = styles.button`
    background: transparent;
    color: ${(props) => props.textcolor};

    border: none;
    font-size: 15px;

    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    font-family: 'Text Me One', sans-serif;
    outline: none;    

    display: flex;
    justify-content: center;
    align-items: center;
`

export default function ButtonText(props){
    return(    
        <ButtonLink as={Link} to={props.to} textcolor={props.textcolor} color={props.color}>
            {props.children}
        </ButtonLink>       
    )
}