import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || '/api'

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})


client.interceptors.response.use(
  (response) => {
    
    if (typeof response.data === 'string') {
      try {
        return JSON.parse(response.data);
      } catch (e) {
        return response.data;
      }
    }
    return response.data;
  },
  (error) => Promise.reject(error)
)

export default client