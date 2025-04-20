import React, { useState } from 'react';
import Signup from '../components/Signup';
import { signUpRequest } from '../apis/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const { username, email, password } = formData;
      const response = await signUpRequest({
        username,
        email,
        password,
      });
      console.log('Response:', response.data);

      if (response.status === 200) {
        setLoading(false);
        toast.success('Registration successful!');

        // Redirect to login or home page
        navigate('/login');
      }

      setFormData({
        username: '',
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
    <Signup
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default Register;
