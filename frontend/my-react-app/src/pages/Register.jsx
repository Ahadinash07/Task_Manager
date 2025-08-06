import { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Typography, Box, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'

const Register = () => {
  const { register, error, setError } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setError(null)
    await register(values)
    setIsSubmitting(false)
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Register
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
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="name" component="div" className="error-message" />
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Typography align="center">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  )
}

export default Register