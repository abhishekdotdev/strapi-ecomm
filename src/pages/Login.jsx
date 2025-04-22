import React, { useState } from 'react';
import LoginPage from '../components/Signin';
import { signInRequest } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Form submitted:', formData);
      const { email, password } = formData;
      const response = await signInRequest({
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response?.data?.user));
      localStorage.setItem('token', response.data?.jwt);
      setAuth({
        user: response?.data?.user,
        token: response?.data?.jwt,
        loading: false,
      });
      console.log('Response:', response.data);

      if (response.status === 200) {
        setLoading(false);
        toast.success('Login successful!');
        navigate('/');
      }

      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginPage
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default Login;
