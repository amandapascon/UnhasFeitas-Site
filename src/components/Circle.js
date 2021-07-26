import React from 'react'
import styles from 'styled-components'

const Circulo = styles.div`
    border-radius: 50%;
    height: 180px;
    width: 180px;
    border: 2px solid #000000;

    font-size: 60px;
    font-family: 'Text Me One', sans-serif;

    background-color: --var(primary);

    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Circle(props) {
    return(   
        <Circulo>
            {props.children}
        </Circulo>
    )
}
