import { server } from './index'

function loginInterno(data) {
    if (data.err) return data
  
    logout()
  
    localStorage.name = data.name
    localStorage.auth_token = data.token
    document.body.classList.add('logged')
  
    localStorage.roles = JSON.stringify(data.admin)
    if (data.admin.indexOf('true') > -1)
      document.body.classList.add('admin')
  
    return { }
}

export async function login(){
    const {data} = await server.put('/login')
    return loginInterno(data)
}

export function logout(history = false) {
    document.body.classList.remove('logged', 'admin')
    localStorage.clear()
  
    if (history !== false) history.push('/')
}

export function isLogged() {
    return typeof localStorage.auth_token === 'string' && localStorage.auth_token.length > 80
}