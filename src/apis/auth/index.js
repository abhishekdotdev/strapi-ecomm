import axios from '../../config/axiosConfig';

export const signUpRequest = async ({ email, password, username }) => {
  try {
    const response = await axios.post('/auth/local/register', {
      email,
      password,
      username,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error.response;
  }
};

export const signInRequest = async ({ identifier, password }) => {
  try {
    const response = await axios.post('/api/auth/local', {
      identifier,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error.response;
  }
};
