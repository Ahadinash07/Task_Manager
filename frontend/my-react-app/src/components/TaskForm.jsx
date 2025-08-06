import { useState, useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, MenuItem, Grid, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import TaskContext from '../context/taskContext'

const TaskForm = () => {
  const { createTask, updateTask, task, getTask } = useContext(TaskContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
  })

  useEffect(() => {
    if (id) {
      getTask(id)
    }
  }, [id, getTask])

  useEffect(() => {
    if (task && id) {
      setInitialValues({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        priority: task.priority,
      })
    }
  }, [task, id])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    dueDate: Yup.date().required('Due date is required'),
    priority: Yup.string().required('Priority is required'),
  })

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await updateTask(id, values)
      } else {
        await createTask(values)
      }
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
    setSubmitting(false)
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <ErrorMessage name="title" component="div" className="error-message" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="dueDate"
                  label="Due Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <ErrorMessage name="dueDate" component="div" className="error-message" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="priority"
                  label="Priority"
                  select
                  variant="outlined"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Field>
                <ErrorMessage name="priority" component="div" className="error-message" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {id ? 'Update Task' : 'Create Task'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default TaskForm