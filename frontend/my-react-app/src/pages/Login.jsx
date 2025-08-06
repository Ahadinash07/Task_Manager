import { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Typography, Box, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'

const Login = () => {
  const { login, error, setError } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setError(null)
    await login(values)
    setIsSubmitting(false)
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Login
        </Typography>
      </Box>
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="email" component="div" className="error-message" />
            <Field
              as={TextField}
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="password" component="div" className="error-message" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography align="center">
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Container>
  )
}

export default Login