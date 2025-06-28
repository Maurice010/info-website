import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'
import Calendar from '../components/Calendar'

const MainCalendar = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kalendarz wydarzeń
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Przeglądaj wydarzenia w widoku kalendarza.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Calendar />
        </Box>

    </Container>
  )
}

export default MainCalendar
