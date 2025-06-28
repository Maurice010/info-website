import React from 'react'

function EventCard({ event }) {
  return (
    <div style={styles.card}>
      <h3>{event.name}</h3>
      <p><strong>Start:</strong> {event.startDate}</p>
      <p><strong>End:</strong> {event.endDate}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      {event.link && (
        <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a></p>
      )}
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  }
}

export default EventCard
