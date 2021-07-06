import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styled-components'

import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'
import Text from '../components/Text'
import StatusBox from '../components/StatusBox'

import {isLogged, login} from '../api/userController'


const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
`

class Home extends Component{
  constructor(props){
    super(props)

    this.inicial_state = {
      phone: '',
      password: '',
      loading: false,
      success: false,
      err: false,
    }
    this.state = { ...this.initial_state }
  }
  
  componentDidMount(){
    if (isLogged())
      this.props.history.push('/')
  }

  async submit(){
    this.setState({ loading: true, err: false, success: false })
    let {err} = await login({...this.state})
    if (!err)
      this.props.history.push('/homePack')
    else
      this.setState({ loading: false, err, success: !err })
  }

  render(){
    return(
      <div>
        <Div>          
          <Title>Unhas Feitas</Title>

          <Label label="Telefone"></Label>
          <br></br>
          <Label type="password" label="Senha"/>

          <br></br><br></br>
          <Button onClick={()=>console.log("pinto")} color='#f7d0b7' textcolor='#222222'>Login</Button>
          <button onClick={()=>console.log("pinto")}>Login</button>
          <br></br>

          <Text textcolor='#545454'>Ainda não tem cadastro?</Text>
          <ButtonText textcolor='#e87b63' as={Link} to='/signin'>SignUp</ButtonText>

          <br></br>
          <StatusBox err={this.state.err} success={this.state.success} />
        </Div>      
        <Footer/>
      </div>
    )
  }

}

export default Home

