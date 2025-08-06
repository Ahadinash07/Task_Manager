import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api/auth'  // Changed from /api/users

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)
  
  // Ensure consistent response structure
  return {
    data: {
      token: response.data.token,
      user: {
        id: response.data.user?._id || response.data.user?.id,
        name: response.data.user?.name,
        email: response.data.user?.email
      }
    }
  }
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  
  // Ensure consistent response structure
  return {
    data: {
      token: response.data.token,
      user: {
        id: response.data.user?._id || response.data.user?.id,
        name: response.data.user?.name,
        email: response.data.user?.email
      }
    }
  }
}

const authService = {
  register,
  login,
}

export default authService