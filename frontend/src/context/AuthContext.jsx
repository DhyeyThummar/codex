import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('pc_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('pc_token', data.token);
    localStorage.setItem('pc_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('pc_token', data.token);
    localStorage.setItem('pc_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('pc_token');
    localStorage.removeItem('pc_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
