import { useState, useEffect } from 'react';
import { isExpired } from "react-jwt";

import { server } from '../api/index'
import history from '../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token){
      if(isExpired(token)){
        setLoading(false);
        handleLogout()
      }
      server.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);  

  async function handleSignin(name, phone, password) {
    if(!name || !phone || !password){
      return true
    }
    try{
      server.post('/user', {name: name, phone: phone, password: password})
      .then((res) => {
        handleLogin(phone, password)
      })
      .catch((err) => {
        if(err)
          return true
      })
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
      server.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/homePack');
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
  
  return { authenticated, loading, handleLogin, handleLogout, handleSignin };
}

