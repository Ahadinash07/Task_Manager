import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    
    const token = localStorage.getItem('token')
    console.log(token)

    if (user && token) {
      setUser(user)
    }
    setIsLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    }
  }

  const login = async (userData) => {
  try {
    const response = await authService.login(userData)
   
    
    if (!response.data?.token) {
      throw new Error('No token received')
    }

    localStorage.setItem('token', response.data.token)
    
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
    } else {
      console.warn('No user data in response')
    }
    
    navigate('/dashboard')
  } catch (error) {
    console.error('Login Error Details:', {
      error,
      response: error.response,
      data: error.response?.data
    })
    setError(error.response?.data?.message || error.message || 'Login failed')
  }
}


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        register,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext