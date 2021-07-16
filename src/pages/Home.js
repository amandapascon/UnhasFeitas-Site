import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styled-components'

import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'
import Text from '../components/Text'

import { server } from '../api/index'

const Div = styles.div`
  align-items: center;   
  display: flex;
  flex-direction: column;
`

class Home extends Component{
  constructor(props){
    super(props)

    this.state = {
      phone: "",
      password: "",
      users: []
    }

  }

  componentDidMount(){
    server.get('/users')
      .then(res=>{
        this.setState({users: res.data})
      })
  }

  async submit(){
    server.put('/login')
  }


  render(){
    return(
      <div>
        <Div>      

          <div>
            {this.state.users.map(
              user=><div key={user.phone}>{user.name}</div>
            )}
          </div>    

          <Title>Unhas Feitas</Title>

          <Label label="Telefone"></Label>
          <br></br>
          <Label type="password" label="Senha"/>

          <br></br><br></br>
          <Button onClick={()=>this.submit()} color='#f7d0b7' textcolor='#222222'>Login</Button>
          <br></br>

          <Text textcolor='#545454'>Ainda não tem cadastro?</Text>
          <ButtonText textcolor='#e87b63' as={Link} to='/signin'>SignUp</ButtonText>
          <br></br>

        </Div>      
        <Footer/>
      </div>
    )
  }

}

export default Home

