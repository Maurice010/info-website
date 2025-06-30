import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'
import Calendar from '../components/Calendar'
import { useLocation } from 'react-router-dom'

const MainCalendar = ({ title }) => {
  const location = useLocation()
  const source = location.pathname === '/my-calendar' ? 'my' : 'all'

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Calendar key={source} source={source} />
      </Box>
    </Container>
  )
}

export default MainCalendar
