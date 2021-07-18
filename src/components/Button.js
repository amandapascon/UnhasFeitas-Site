import React from 'react'
import styles from 'styled-components'

const ButtonLink = styles.button`
    background: ${props => props.color};
    color: ${(props) => props.textcolor};

    border: none;
    padding: 15px 60px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    font-family: 'Text Me One', sans-serif;
    outline: none;    

    border-radius: 25px;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px var(--darkgrey);

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`

export default function Button(props){
    return(    
        <ButtonLink onClick={props.onClick} textcolor={props.textcolor} color={props.color}>
            {props.children}
        </ButtonLink>       
    )
}