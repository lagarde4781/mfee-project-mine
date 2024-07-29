import axios from 'axios';

const capstoneApi = axios.create({
  baseURL: 'https://test.neuraac.com/api',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhZ2FyZGUzQGdtYWlsLmNvbSIsImlhdCI6MTcyMjIzNTc4NSwiZXhwIjoxNzIyMjM5Mzg1fQ.H_MkKXKs5ZUt_tYI4yJHXi4seQixJjbVcjyWA1BbyPM`
  }
});
export default capstoneApi;
