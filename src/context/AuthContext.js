import React, { createContext } from 'react';

import useAuth from './useAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const {authenticated, admin, loading, handleLogin, handleLogout, handleSignin } = useAuth();
  
    return (
      <Context.Provider value={{ loading, authenticated, admin, handleLogin, handleLogout, handleSignin }}>
        {children}
      </Context.Provider>
    );
  }
  
  export { Context, AuthProvider };
  