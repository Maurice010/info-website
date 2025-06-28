import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'

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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Events</h2>

      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          style={{ marginRight: '10px' }}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          style={{ marginRight: '10px' }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            placeholder="Search location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          {locationSuggestions.length > 0 && (
            <ul style={styles.suggestions}>
              {locationSuggestions.map((loc, idx) => (
                <li key={idx} onClick={() => handleLocationSelect(loc)}>{loc}</li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          style={{ marginRight: '10px' }}
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {filteredEvents.map((event, idx) => (
        <EventCard key={idx} event={event} />
      ))}
      {filteredEvents.length === 0 && <p>No events match your filters.</p>}
    </div>
  )
}

const styles = {
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    border: '1px solid #ccc',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
    zIndex: 10,
  }
}

export default EventList
