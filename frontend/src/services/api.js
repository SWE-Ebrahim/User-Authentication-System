import axios from 'axios'

// Base URL for API endpoints, loaded from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending/receiving cookies with requests
})

// Request interceptor - runs before every API request
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here if needed
    return config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error)
  }
)

// Response interceptor - runs after every API response
api.interceptors.response.use(
  (response) => {
    // Process successful responses
    return response
  },
  (error) => {
    // Handle response errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // Redirect to login page
    }
    return Promise.reject(error)
  }
)

export default api