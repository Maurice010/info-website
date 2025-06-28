import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useState, useEffect } from 'react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
 
function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const eventModal = useState(() => createEventModalPlugin())[0]
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-07-16 00:00',
        end: '2025-07-16 02:00',
        description: 'My cool description'
      },
    ],
    plugins: [
        eventsService,
        eventModal
    ]
  })
 
  useEffect(() => {
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default Calendar