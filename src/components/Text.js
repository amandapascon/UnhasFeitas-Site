import React from 'react';
import styles from 'styled-components'

const P = styles.p`
    font-size: 15px;
    font-family: 'Text Me One', sans-serif;
    color: ${(props) => props.textcolor};
`

export default function Text(props){
    return(
       <P textcolor={props.textcolor}>{props.children}</P>
    )
}
