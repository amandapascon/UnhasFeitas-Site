import React from 'react';
import styles from 'styled-components'

import img from '../assets/images/headerMobile.svg'
import img2 from '../assets/images/headerTablet.svg'
import img3 from '../assets/images/headerWeb.svg'

/* mobile */
const Img = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    @media(min-width: 500px) {
        display: none;
    }
      
`
/* Tablet */
const Img2 = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    @media(max-width: 500px) {
        display: none;
    }

    @media(min-width: 1100px) {
        display: none;
    }

`
/* Web */
const Img3 = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    @media(max-width: 1100px) {
        display: none;
    }

`

export default function Header (){
    return(
        <>
        <Img src={img}></Img>
        <Img2 src={img2}></Img2>
        <Img3 src={img3}></Img3>
        </>
    )
}
 