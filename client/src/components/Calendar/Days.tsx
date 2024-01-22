import dayjs from 'dayjs'
import { useState, useEffect, FC } from 'react'
import ViewDay from './ViewDay'
import { CalendarEventType } from '@/types/CalendatEventType'

type DayPropsType = {
  day: dayjs.Dayjs
  rowIdx: number
  events: CalendarEventType[]
}

const Day: FC<DayPropsType> = ({ day, rowIdx, events }) => {
  const [dayEvents, setDayEvents] = useState<CalendarEventType[]>([])
  const [eventsView, setEventsView] = useState(false)

  useEffect(() => {
    const e = events?.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    )
    setDayEvents(e)
  }, [events, day])

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : ''
  }
  return (
    <div className="border border-gray-200 flex flex-col h-36">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1">
        {dayEvents?.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setEventsView(true)}
            style={{ backgroundColor: evt.label }}
            className={`p-1 mr-3 text-white text-[10px] md:text-sm rounded mb-1 truncate cursor-pointer`}
          >
            {evt.isPending ? '(CONVITE) ' : ''}
            {evt.title}
          </div>
        ))}
      </div>
      <ViewDay
        dayEvents={dayEvents}
        isOpen={eventsView}
        setIsOpen={() => setEventsView(false)}
      />
    </div>
  )
}

export default Day
