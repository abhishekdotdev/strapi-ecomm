export const getProduct = async () => {
  try {
    const response = await axios.get('/products', {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
