import React from 'react';
import styles from 'styled-components'

const P = styles.p`
    font-size: 20px;
    font-weight: bold;
    font-family: 'Text Me One', sans-serif;
    color: ${(props) => props.textcolor};
    margin-bottom: 0;
`

export default function TextBold(props){
    return(
       <P textcolor={props.textcolor}>{props.children}</P>
    )
}
