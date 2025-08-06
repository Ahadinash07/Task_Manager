import { useContext, useEffect } from 'react'
import { Container, Typography, Button, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import TaskItem from '../components/TaskItem'
import TaskContext from '../context/taskContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { tasks, getTasks, filter, setFilter } = useContext(TaskContext)
  const navigate = useNavigate()

  useEffect(() => {
    getTasks()
  }, [getTasks, filter])

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }



  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/tasks/new')}
        >
          Add Task
        </Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="task filter"
        >
          <ToggleButton value="all" aria-label="all tasks">
            All
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed tasks">
            Completed
          </ToggleButton>
          <ToggleButton value="pending" aria-label="pending tasks">
            Pending
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {tasks.length === 0 ? (
        <Typography>No tasks found. Create one to get started!</Typography>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </Container>
  )
}

export default Dashboard