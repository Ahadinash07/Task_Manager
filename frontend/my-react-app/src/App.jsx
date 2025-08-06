import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { TaskProvider } from './context/taskContext'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskForm from './components/TaskForm'
import TaskDetails from './pages/TaskDetails'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/edit/:id" element={<TaskForm />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  )
}

export default App