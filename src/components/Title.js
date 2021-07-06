import React from 'react';
import styles from 'styled-components'

const P = styles.p`
    font-size: 50px;
    font-family: 'Playlist', sans-serif;
    color: var(--black);
`

export default function Title(props){
    return(
       <P>{props.children}</P>
    )
}
