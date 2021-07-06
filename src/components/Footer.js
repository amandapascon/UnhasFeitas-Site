import React from 'react';
import styles from 'styled-components'

import img from '../assets/images/footerMobile.svg'

const Img = styles.img`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
`

export default function Footer (){
    return(
        <Img src={img}></Img>
    )
}
