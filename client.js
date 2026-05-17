import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || '/api'

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json','X-Master-Key': import.meta.env.VITE_JSONBIN_KEY },
})

export default client
