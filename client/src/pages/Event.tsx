import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import LoadingScreen from '@/components/LoadingScreen'
import { Event } from '@/types/Event'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Edit, Eye, Loader2, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Participant } from '@/types/Participant'
import EventParticipations from '@/components/EventParticipations'
import useAuth from '@/hooks/useAuth'

const EventPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [isLoading, setIsLoding] = useState(false)
  const [isToggleParticipation, setIsToggleParticipation] = useState(false)
  const [participanstViewOpen, setParticipanstViewOpen] = useState(false)
  const [isDeleting, setIsDelting] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [participants, setParticipants] = useState<Participant[] | null>(null)
  const api = useApi({ shouldRefreshToken: true })
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) return navigate('/dashboard')
    const fetchEvent = async () => {
      setIsLoding(true)
      try {
        const { data } = await api.get(`/event/${id}`)
        setEvent(data)
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado, tente mais tarde!'
        })
      } finally {
        setIsLoding(false)
      }
    }
    fetchEvent()
  }, [api, id, navigate])

  const toggleParticipation = async () => {
    try {
      setIsToggleParticipation(true)
      const { data } = await api.put(`/event/participate/${id}`)
      setEvent(data)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Ah não! Algo deu errado, tente mais tarde.'
      })
    } finally {
      setIsToggleParticipation(false)
    }
  }

  const showParticipants = async () => {
    if (!participants) {
      try {
        setParticipanstViewOpen(true)
        const { data } = await api.get(`/event/participations/${id}`)
        setParticipants(data)
        return
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Ah não! Algo deu errado, tente mais tarde.'
        })
        return
      }
    }
    setParticipanstViewOpen(true)
  }

  const onDelete = async (id: number) => {
    try {
      setIsDelting(true)
      await api.delete(`/event/${id}`)
      navigate('/dashboard')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Ah não! Algo deu errado, tente mais tarde.'
      })
    } finally {
      setIsDelting(false)
    }
  }

  if (isLoading || !event) {
    return <LoadingScreen />
  }

  const inicialDate = new Date(event.inicialDate)
  const finalDate = new Date(event.finalDate)

  return (
    <div className="grow w-full mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0 px-2 md:px-0">
        <h1 className="mb-3 font-bold text-5xl text-primary mr-3">
          {event.name}
        </h1>
        {event.creator?.id === user?.id ? (
          <div className="flex gap-4 items-center ml-auto">
            <Button
              onClick={() => {
                navigate(`/event/edit/${event.id}`)
              }}
              size="icon"
              className="w-full"
              variant="ghost"
            >
              <Edit />
            </Button>

            <Button
              onClick={isDeleting ? () => {} : () => onDelete(event.id)}
              size="sm"
              className="w-full"
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <Button
            onClick={toggleParticipation}
            disabled={isToggleParticipation}
            variant={event.userIsParticipates ? 'destructive' : 'default'}
          >
            {!isToggleParticipation ? (
              event.userIsParticipates ? (
                'Cancelar participação'
              ) : (
                'Participar desse evento!'
              )
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-1 items-center w-full bg-white p-10">
        <div className="flex flex-col space-y-1.5 w-full items-center">
          <Label
            htmlFor="date"
            className="flex items-center gap-4 text-primary font-bold text-xl"
          >
            Quando será evento? <CalendarIcon />
          </Label>
          <div className="w-[85%] flex items-center justify-around flex-col sm:flex-row">
            <Calendar
              id="date"
              selected={inicialDate}
              disableNavigation
              month={inicialDate}
            />
            <span className="text-primary font-semibold">Até</span>
            <Calendar
              id="date"
              selected={finalDate}
              disableNavigation
              month={finalDate}
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-1.5 items-center mt-20">
          <Label
            htmlFor="date"
            className="flex items-center gap-4 text-primary font-bold text-xl"
          >
            Horário do evento:
          </Label>
          <p className="text-semibold text-primary">
            {event.inicialTime} até {event.finalTime}
          </p>
        </div>
        <div className="w-full flex flex-col space-y-1.5 items-center mt-20">
          <Label
            htmlFor="date"
            className="flex items-center gap-4 text-primary font-bold text-xl"
          >
            Mais sobre esse evento:
          </Label>
          <p className="w-full py-10 sm:px-40 sm:py-20 whitespace-pre-wrap break-words">
            {event.description}
          </p>
        </div>
        <div className="w-full flex gap-4 space-y-1.5 items-center mt-20">
          <Label
            htmlFor="date"
            className="flex items-center gap-4 text-primary font-bold text-xl"
          >
            Veja quem já está participando:
          </Label>
          <Button onClick={showParticipants} size="icon" variant="ghost">
            <Eye />
          </Button>
        </div>
        <div className="w-full flex gap-4 space-y-1.5 items-center mt-20">
          <Label
            htmlFor="date"
            className="flex items-center gap-4 text-primary font-bold text-xl"
          >
            Evento criado por:
          </Label>
          <p className="whitespace-pre-wrap font-md font-semibold">
            {event.creator?.username}
          </p>
        </div>
      </div>
      <EventParticipations
        isOpen={participanstViewOpen}
        setIsOpen={() => setParticipanstViewOpen(false)}
        participations={participants}
        isLoading={!participants}
      />
    </div>
  )
}

export default EventPage
