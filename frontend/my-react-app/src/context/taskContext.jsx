import { createContext, useState } from 'react'
import taskService from '../services/taskService'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  const getTasks = async () => {
    setIsLoading(true)
    try {
      const response = await taskService.getTasks(filter)
      setTasks(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const getTask = async (id) => {
    setIsLoading(true)
    try {
      const response = await taskService.getTask(id)
      setTask(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching task')
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (taskData) => {
    setIsLoading(true)
    try {
      const response = await taskService.createTask(taskData)
      setTasks([response.data, ...tasks])
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating task')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateTask = async (id, taskData) => {
    setIsLoading(true)
    try {
      const response = await taskService.updateTask(id, taskData)
      setTasks(tasks.map(task => task._id === id ? response.data : task))
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating task')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async (id) => {
    setIsLoading(true)
    try {
      await taskService.deleteTask(id)
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting task')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleComplete = async (id, completed) => {
    try {
      const response = await taskService.updateTask(id, { completed })
      setTasks(tasks.map(task => task._id === id ? response.data : task))
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating task')
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        isLoading,
        error,
        filter,
        setFilter,
        getTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        setError,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext