import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styled-components'

//componentes
import Button from '../components/Button'
import ButtonText from '../components/ButtonText'
import Footer from '../components/Footer'
import Title from '../components/Title'
import Label from '../components/Label'
import Text from '../components/Text'

//servidor
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
      phone: '',
      password: '',
      users: [],
      token: '',
      err: false,
    }
  }

  /* componentDidMount(){
    server.get('/users')
      .then(res=>{
        this.setState({users: res.data})
      })
      .catch((err) => {
        console.error(err);
      })
  } */

  async onSubmit(){
    console.log(this.state.phone)
    console.log(this.state.password)

    server.put('/login', {phone: this.state.phone, password: this.state.password})
      .then(res=>{
        this.setState({token: res.data.token})
        console.log(res.data.token)
      })
      .catch((err) => {
        this.setState({err: true})
        console.error(err);
      })
  }

  render(){
    return(
      <div>
        <Div>      

          {/* <div>
            {this.state.users.map(
              user=><div key={user.phone}>{user.name}</div>
            )}
          </div>   */}  

          <Title>Unhas Feitas</Title>

          {this.state.err && <Text textcolor='#f00'>Telefone ou Usuário incorretos!</Text>}

          <Label label="Telefone" onChange={(e) => this.setState({ phone: e.target.value })}/>
          <br></br>
          <Label type="password" label="Senha" onChange={(e) => this.setState({ password: e.target.value })}/>

          <br></br><br></br>
          <Button onClick={()=>this.onSubmit()} color='#f7d0b7' textcolor='#222222'>Login</Button>
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

