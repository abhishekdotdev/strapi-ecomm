import React from 'react';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { auth } = useAuth();

  console.log('Auth from home page', auth);
  return <div>HomePage</div>;
};

export default HomePage;
