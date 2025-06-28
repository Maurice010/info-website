import React, { useState } from 'react'

function EventForm() {

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const eventData = {
      name: formData.get('name'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      category: formData.get('category'),
      location: formData.get('location'),
      description: formData.get('description'),
      link: formData.get('link'),
    }

    console.log('Event submitted:', eventData)
    e.target.reset()
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label><br />
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Start Date & Time:</label><br />
          <input type="datetime-local" name="startDate" required />
        </div>
        <div>
          <label>End Date & Time:</label><br />
          <input type="datetime-local" name="endDate" required />
        </div>
        <div>
          <label>Category:</label><br />
          <input type="text" name="category" />
        </div>
        <div>
          <label>Location:</label><br />
          <input type="text" name="location" />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea name="description" rows="3"></textarea>
        </div>
        <div>
          <label>Link:</label><br />
          <input type="url" name="link" placeholder="https://example.com" />
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  )
}

export default EventForm
