import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Paper, Divider, useTheme, alpha } from '@mui/material'
import EventItem from '../components/EventItem'
import axios from 'axios'

const HomePage = () => {
  const theme = useTheme()
  const [latestEvents, setLatestEvents] = useState([])

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const res = await axios.get('/api/events/latest?limit=3')
        setLatestEvents(res.data)
      } catch {
        setLatestEvents([])
      }
    }
    fetchLatestEvents()
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Sekcja powitalna */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            p: 2,
          }}
        >
          <Typography variant="h4" color="primary" sx={{ m: 0 }}>
            Witaj na InfoTech!
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" color="text.primary">
            Jest to strona mająca na celu pomóc w znalezieniu i wyborze najlepszych wydarzeń informatycznych.
          </Typography>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* Sekcja aktualności */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            p: 2,
          }}
        >
          <Typography variant="h4" color="primary" sx={{ m: 0 }}>
            Aktualności
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {latestEvents.length === 0 ? (
            <Typography color="text.secondary">Brak wydarzeń.</Typography>
          ) : (
            latestEvents.map(event => (
              <EventItem key={event.id} event={event} />
            ))
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default HomePage
