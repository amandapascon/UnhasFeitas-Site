import React from 'react';
import styles from 'styled-components'

import img from '../assets/images/footerMobile.svg'
import img2 from '../assets/images/footerTablet.svg'
import img3 from '../assets/images/footerWeb.svg'

const Img = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    @media(min-width: 500px) {
        display: none;
    }
`

const Img2 = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    @media(max-width: 500px) {
        display: none;
    }

    @media(min-width: 1100px) {
        display: none;
    }
`

const Img3 = styles.img`
    pointer-events: none;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    @media(max-width: 1100px) {
        display: none;
    }
`

export default function Footer (){
    return(
        <>
        <Img src={img}></Img>
        <Img2 src={img2}></Img2>
        <Img3 src={img3}></Img3>
        </>
    )
}
