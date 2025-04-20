import axios from 'axios';

export default axios.create({
  //   baseURL: import.meta.env.STRAPI_API_URL,
  baseURL: 'http://localhost:1337/api',
});
