import LoadingScreen from '@/components/LoadingScreen'
import generateEventObjects from '@/helpers/generateCalendarEvents'
import getFirstAndLastDayOfMonth from '@/helpers/getMouthDateInterval'
import { useApi } from '@/hooks/useApi'
import { Event } from '@/types/Event'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getMonth } from '@/helpers/getCalendarMouth'
import Month from '@/components/Calendar/Month'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CalendarEventType } from '@/types/CalendatEventType'
import { Button } from '@/components/ui/button'

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [events, setEvents] = useState<CalendarEventType[]>([])
  const [currentMouth, setCurrentMonth] = useState<
    dayjs.Dayjs[][] | undefined
  >()
  const api = useApi({ shouldRefreshToken: true })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const [firstDay, lastDay] = getFirstAndLastDayOfMonth(monthIndex + 1)

    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const { data } = await api.get('/event/geteventsuserparticipates', {
          params: {
            inicialDate: firstDay,
            finalDate: lastDay
          },
          signal
        })
        let calendarEvents: CalendarEventType[] = []
        data.events.map((e: Event) => {
          const formatedEvents = generateEventObjects(e, monthIndex + 1)
          calendarEvents = calendarEvents.concat(formatedEvents)
        })
        setEvents(calendarEvents)
      } catch (err) {
        //
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
    return () => {
      controller.abort()
    }
  }, [api, monthIndex])

  useEffect(() => {
    const m = getMonth(monthIndex)
    setCurrentMonth(m)
  }, [monthIndex])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="mx-auto max-w-7xl mt-10 w-full bg-white flex flex-col">
          <header className="px-4 py-2 flex items-center">
            <Button
              variant="ghost"
              onClick={() => setMonthIndex((prev) => prev - 1)}
            >
              <ArrowLeft />
            </Button>
            <h2 className="mx-4 text-xl text-gray-500 font-bold">
              {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
            </h2>
            <Button
              variant="ghost"
              onClick={() => setMonthIndex((prev) => prev + 1)}
            >
              <ArrowRight />
            </Button>
          </header>
          <div className="flex flex-1">
            <Month month={currentMouth} events={events} />
          </div>
        </main>
      )}
    </>
  )
}

export default Calendar
