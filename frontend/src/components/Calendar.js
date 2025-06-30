import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useEffect } from 'react'
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import axios from 'axios'
import { formatCalendarDate } from '../utils/dateUtils'

function Calendar({ source = 'all' }) {
  const eventsService = createEventsServicePlugin()
  const eventModal = createEventModalPlugin()

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [],
    plugins: [eventsService, eventModal],
  })

  useEffect(() => {
    const fetchEvents = async () => {
      const endpoint =
        source === 'my' ? '/api/users/me/events' : '/api/events'

      const token = localStorage.getItem('token')

      try {
        const res = await axios.get(endpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

        const formatted = res.data.map((e) => ({
          id: String(e.id),
          title: e.name,
          start: formatCalendarDate(e.startDate),
          end: formatCalendarDate(e.endDate),
          description: e.description || '',
        }))

        eventsService.set(formatted)
      } catch (err) {
        console.error('Błąd przy pobieraniu wydarzeń z API:', err)
      }
    }

    fetchEvents()
  }, [eventsService, source])

  return (
    <div style={{ padding: '2rem' }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Calendar
