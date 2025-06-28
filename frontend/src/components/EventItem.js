import React from 'react'
import { formatDateTime } from '../utils/dateUtils'
import {
  Box,
  Typography,
  Divider,
  Paper,
  Link as MuiLink
} from '@mui/material'

function EventItem({ event }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {event.name}
      </Typography>

      <Typography color="text.secondary">
        <strong>Start:</strong> {formatDateTime(event.startDate)}
      </Typography>
      <Typography color="text.secondary">
        <strong>Koniec:</strong> {formatDateTime(event.endDate)}
      </Typography>
      <Typography color="text.secondary">
        <strong>Kategoria:</strong> {event.category}
      </Typography>
      <Typography color="text.secondary">
        <strong>Lokalizacja:</strong> {event.location}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        <strong>Opis:</strong> {event.description}
      </Typography>

      {event.link && (
        <Typography>
          <strong>Link:</strong>{' '}
          <MuiLink href={event.link} target="_blank" rel="noopener noreferrer">
            {event.link}
          </MuiLink>
        </Typography>
      )}

      <Divider sx={{ mt: 2 }} />
    </Paper>
  )
}

export default EventItem
