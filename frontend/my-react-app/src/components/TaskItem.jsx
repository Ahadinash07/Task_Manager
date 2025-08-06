import { useContext } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from '@mui/material'
import { format } from 'date-fns'
import TaskContext from '../context/taskContext'
import { useNavigate } from 'react-router-dom'

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete } = useContext(TaskContext)
  const navigate = useNavigate()

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

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div">
            {task.title}
          </Typography>
          <Chip
            label={task.priority}
            color={getPriorityColor(task.priority)}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant={task.completed ? 'contained' : 'outlined'}
            color={task.completed ? 'success' : 'primary'}
            onClick={() => toggleComplete(task._id, !task.completed)}
          >
            {task.completed ? 'Completed' : 'Mark Complete'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/tasks/${task._id}`)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/tasks/edit/${task._id}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TaskItem