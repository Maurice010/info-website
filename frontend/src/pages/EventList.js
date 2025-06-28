import React, { useEffect, useState } from 'react'
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

function EventList() {
  const [events] = useState([
    {
      name: 'Conference A',
      startDate: '2025-07-01T10:00',
      endDate: '2025-07-01T14:00',
      category: 'Tech',
      location: 'New York',
      description: 'A big tech conference.',
      link: 'https://confA.com'
    },
    {
      name: 'Music Fest',
      startDate: '2025-08-12T18:00',
      endDate: '2025-08-13T01:00',
      category: 'Music',
      location: 'Los Angeles',
      description: 'Outdoor music festival.',
      link: ''
    },
    {
      name: 'Art Expo',
      startDate: '2025-09-10T09:00',
      endDate: '2025-09-10T17:00',
      category: 'Art',
      location: 'Chicago',
      description: 'Gallery and artist talks.',
      link: 'https://artexpo.com'
    }
  ])
  

  const [filters, setFilters] = useState({
    name: '',
    category: 'all',
    location: '',
    startDate: '',
    endDate: ''
  })

  const [categories, setCategories] = useState([])
  const [locationSuggestions, setLocationSuggestions] = useState([])

  useEffect(() => {
    setCategories([...new Set(events.map(e => e.category))])
  }, [events])

  useEffect(() => {
    if (filters.location === '') {
      setLocationSuggestions([])
      return
    }

    const input = filters.location.toLowerCase()
    const suggestions = [...new Set(events
      .map(e => e.location)
      .filter(loc => loc.toLowerCase().includes(input))
    )]
    setLocationSuggestions(suggestions)
  }, [filters.location, events])

  const filteredEvents = events.filter(event => {
    const matchName = event.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchCategory = filters.category === 'all' || event.category === filters.category
    const matchLocation = filters.location === '' || event.location.toLowerCase() === filters.location.toLowerCase()
    const matchDate =
      (!filters.startDate || event.endDate >= filters.startDate) &&
      (!filters.endDate || event.startDate <= filters.endDate)

    return matchName && matchCategory && matchLocation && matchDate
  })

  const handleLocationSelect = (loc) => {
    setFilters({ ...filters, location: loc })
    setLocationSuggestions([])
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista wydarzeń
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <TextField
            label="Nazwa"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            displayEmpty
          >
            <MenuItem value="all">Wszystkie kategorie</MenuItem>
            {categories.map((cat, i) => (
              <MenuItem key={i} value={cat}>{cat}</MenuItem>
            ))}
          </Select>

          <Box sx={{ position: 'relative', flexGrow: 1 }}>
            <TextField
              label="Lokalizacja"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Data do"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
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
