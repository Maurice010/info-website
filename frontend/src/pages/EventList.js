import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Container,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  List,
  ListItem,
  Divider
} from '@mui/material'
import EventItem from '../components/EventItem'
import axios from 'axios'

function EventList() {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [locationSuggestions, setLocationSuggestions] = useState([])

  const [filters, setFilters] = useState({
    name: '',
    category: 'all',
    location: '',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events')
        setEvents(res.data)
        const uniqueCategories = [...new Set(res.data.map(e => e.category))]
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Błąd przy pobieraniu wydarzeń:', err)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (!filters.location) {
      setLocationSuggestions([])
      return
    }

    const input = filters.location.toLowerCase()
    const suggestions = [...new Set(
      events
        .map(e => e.location)
        .filter(loc => loc.toLowerCase().includes(input))
    )]

    setLocationSuggestions(suggestions)
  }, [filters.location, events])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchName = event.name.toLowerCase().includes(filters.name.toLowerCase())
      const matchCategory = filters.category === 'all' || event.category === filters.category
      const matchLocation =
        !filters.location || event.location.toLowerCase() === filters.location.toLowerCase()
      const matchDate =
        (!filters.startDate || event.endDate >= filters.startDate) &&
        (!filters.endDate || event.startDate <= filters.endDate)

      return matchName && matchCategory && matchLocation && matchDate
    })
  }, [events, filters])

  const handleLocationSelect = (loc) => {
    setFilters(prev => ({ ...prev, location: loc }))
    setLocationSuggestions([]) 
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista wydarzeń
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Nazwa"
            value={filters.name}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            sx={{ minWidth: 150 }}
          />

          <Select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            displayEmpty
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">Wszystkie kategorie</MenuItem>
            {categories.map((cat, i) => (
              <MenuItem key={i} value={cat}>{cat}</MenuItem>
            ))}
          </Select>

          <Box sx={{ position: 'relative', minWidth: 200 }}>
            <TextField
              label="Lokalizacja"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              fullWidth
            />
            {locationSuggestions.length > 0 && (
              <Paper sx={styles.suggestions}>
                <List>
                  {locationSuggestions.map((loc, idx) => (
                    <ListItem
                      button
                      key={idx}
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          <TextField
            label="Data od"
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 160 }}
          />

          <TextField
            label="Data do"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 160 }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <EventItem key={idx} event={event} />
          ))
        ) : (
          <Typography color="text.secondary">
            Brak wydarzeń spełniających podane kryteria.
          </Typography>
        )}
      </Box>
    </Container>
  )
}

const styles = {
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    maxHeight: 200,
    overflowY: 'auto'
  }
}

export default EventList

