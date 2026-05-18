import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || '/api'

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', },
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

client.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error
    if (response && response.status === 429) {
      // Respect Retry-After header if present
      const retryAfter = response.headers['retry-after']
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.min(1000 * 2 ** config.retryCount, 30000)

      // Initialize retry count
      config.retryCount = config.retryCount || 0

      if (config.retryCount < 3) {
        config.retryCount += 1
        // Wait before retrying
        return new Promise(resolve => {
          setTimeout(() => resolve(client(config)), delay)
        })
      }
    }
    return Promise.reject(error)
  }
)

export default client
