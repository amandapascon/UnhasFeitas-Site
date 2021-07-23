import React from 'react';
import styles from 'styled-components'

import img from '../assets/images/headerMobile.svg'

const Img = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`

export default function Header (){
    return(
        <>
        <Img src={img}></Img>
        </>
    )
}
 