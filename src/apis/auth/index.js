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

export const signInRequest = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/local', {
      identifier: email,
      password,
    });
    console.log('RESPONSE', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
