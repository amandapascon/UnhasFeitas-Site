import { useState, useEffect } from 'react';
import { isExpired } from "react-jwt";

import { server } from '../api/index'
import history from '../history';
import jwt_decode from "jwt-decode"

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      if(isExpired(token)){
        setLoading(false);
        handleLogout()
      }
      server.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      const decoded = jwt_decode(localStorage.getItem('token'))
      setAuthenticated(true)
      console.log("role: "+decoded.role);
      if(decoded.role === "true")
        setAdmin(true)
    }
    setLoading(false)
  }, []);

  async function handleSignin(name, phone, password) {
    if(!name || !phone || !password){
      return true
    }
    try{
      server.post('/user', {name: name, phone: phone, password: password})
      return false
    }catch{
      return true
    }
  }

  async function handleLogin(phone, password) {
    if(!phone || !password){
      return true
    }
    try{
      const { data: { token } } = await server.put('/login', {phone: phone, password: password})
      localStorage.setItem('token', JSON.stringify(token));
      server.defaults.headers.Authorization = `Bearer ${token}`
      setAuthenticated(true);
      const decoded = jwt_decode(token)
      if(decoded.role === "true"){
        setAdmin(true)
        history.push('/homeAdmin') 
      }               
      else
        history.push('/homePack')
    }catch{
      return true
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    server.defaults.headers.Authorization = undefined;
    history.push('/');
  }
  
  return { authenticated, admin, loading, handleLogin, handleLogout, handleSignin };
}

