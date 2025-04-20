import { useContext } from 'react';
import { AuthContextProvider } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContextProvider);
};
