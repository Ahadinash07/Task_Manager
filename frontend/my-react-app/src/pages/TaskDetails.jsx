import { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Container,
} from '@mui/material'
import { format } from 'date-fns'
import TaskContext from '../context/taskContext'

const TaskDetails = () => {
  const { task, getTask, deleteTask, toggleComplete } = useContext(TaskContext)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getTask(id)
    }
  }, [id, getTask])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'success'
      default:
        return 'primary'
    }
  }

  const handleDelete = async () => {
    await deleteTask(id)
    navigate('/dashboard')
  }

  if (!task) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          {task.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
          <Chip
            label={task.priority}
            color={getPriorityColor(task.priority)}
            size="small"
            sx={{ mr: 2 }}
          />
          <Typography variant="body2">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
          {task.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={task.completed ? 'contained' : 'outlined'}
            color={task.completed ? 'success' : 'primary'}
            onClick={() => toggleComplete(task._id, !task.completed)}
          >
            {task.completed ? 'Completed' : 'Mark Complete'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/tasks/edit/${task._id}`)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default TaskDetails