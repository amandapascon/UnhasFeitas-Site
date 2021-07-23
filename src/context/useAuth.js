import { useState, useEffect } from 'react';

import { server } from '../api/index'
import history from '../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token){
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

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    server.defaults.headers.Authorization = undefined;
    history.push('/');
  }
  
  return { authenticated, loading, handleLogin, handleLogout};
}

