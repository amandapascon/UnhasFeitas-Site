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

  async function handleLogin(phone, password) {
    try{
      const { data: { token } } = await server.put('/login', {phone: phone, password: password})
      localStorage.setItem('token', JSON.stringify(token));
      server.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/homePack');
    }catch{
      console.log("erro")
    }
  }

  async function handleSignin(name, phone, password) {
    try{
      server.post('/user', {name: name, phone: phone, password: password})
      .then((res) => {
        handleLogin(phone, password)
      })
      .catch((err) => {
        if(err)
          console.log("erro")
      })
    }catch{
      console.log("erro")
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

