import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api/tasks'

// Get all tasks
const getTasks = async (filter) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      completed: filter === 'completed' ? true : filter === 'pending' ? false : undefined,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Get single task
const getTask = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const response = await axios.get(API_URL + '/' + id, config)
  return response.data
}

// Create task
const createTask = async (taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const response = await axios.post(API_URL, taskData, config)
  return response.data
}

// Update task
const updateTask = async (id, taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const response = await axios.put(API_URL + '/' + id, taskData, config)
  return response.data
}

// Delete task
const deleteTask = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const response = await axios.delete(API_URL + '/' + id, config)
  return response.data
}

const taskService = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}

export default taskService