import { useEffect, useReducer, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { toast } from '@/components/ui/use-toast'
import { Event } from '@/types/Event'
import LoadingScreen from '@/components/LoadingScreen'
import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type Action =
  | { type: 'LOAD_EVENTS'; payload: { events: Event[]; totalPages: number } }
  | { type: 'REMOVE_EVENT'; payload: number }
  | { type: 'CHANGE_PAGE'; payload: number }

type EventContextType = {
  events: Event[]
  page: number
  totalPages: number
}

const reducer = (state: EventContextType, action: Action): EventContextType => {
  if (action.type === 'LOAD_EVENTS') {
    return {
      ...state,
      events: action.payload.events,
      totalPages: action.payload.totalPages
    }
  } else if (action.type === 'REMOVE_EVENT') {
    const eventId = action.payload
    const eventIndex = state.events.findIndex(
      (event: Event) => event.id === eventId
    )
    if (eventIndex !== -1) {
      state.events.splice(eventIndex, 1)
    }
    return { ...state }
  } else if (action.type === 'CHANGE_PAGE') {
    return { ...state, page: action.payload }
  } else {
    return { ...state }
  }
}

const initialState: EventContextType = {
  events: [],
  page: 1,
  totalPages: 0
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [deletingEventId, setDeletingEventId] = useState<number | null>(null)
  const [eventsContext, eventsDispatch] = useReducer(reducer, initialState)
  const api = useApi({ shouldRefreshToken: true })
  const navigate = useNavigate()
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get('/event/userevents', {
          signal,
          params: {
            page: eventsContext.page
          }
        })
        eventsDispatch({
          type: 'LOAD_EVENTS',
          payload: { events: data.events, totalPages: data.pages }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.code !== 'ERR_CANCELED') {
          toast({
            variant: 'destructive',
            title: 'Ah não! Algo deu errado, tente mais tarde.'
          })
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [api, eventsContext.page])

  const onPageChange = (pageNumber: number) => {
    eventsDispatch({ type: 'CHANGE_PAGE', payload: pageNumber })
  }

  const onDeleteEvent = async (id: number) => {
    try {
      setDeletingEventId(id)
      await api.delete(`/event/${id}`)
      eventsDispatch({ type: 'REMOVE_EVENT', payload: id })
      toast({
        variant: 'default',
        title: 'Evento excluído!'
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Ah não! Algo deu errado, tente mais tarde.'
      })
    } finally {
      setDeletingEventId(null)
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="grow mx-auto max-w-7xl md:p-10">
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="mb-3 font-bold text-5xl text-primary mr-3">
              Meus eventos
            </h1>
            <Button
              onClick={() => navigate('/events/create')}
              variant="default"
            >
              Criar Novo Evento!
            </Button>
          </div>
          {/* display all user events */}
          {eventsContext.events.length !== 0 && (
            <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
              {eventsContext.events.map((event) => (
                <EventCard
                  event={event}
                  key={event.id}
                  isLoading={event.id === deletingEventId}
                  onDelete={onDeleteEvent}
                />
              ))}
            </ul>
          )}
          <div className="mt-5">
            {eventsContext.totalPages > 1 && (
              <Pagination
                currentPage={eventsContext.page}
                totalPages={eventsContext.totalPages}
                onPageClick={onPageChange}
              />
            )}
          </div>
        </main>
      )}
    </>
  )
}

export default Dashboard
