import { FC } from 'react'
import { Event } from '@/types/Event'
import { Link, useNavigate } from 'react-router-dom'
import getSepareteDate from '@/helpers/getSepareteDate'
import { Button } from './ui/button'
import { getDate, getYear } from 'date-fns'
import { Loader2, Trash, Edit } from 'lucide-react'
import useAuth from '@/hooks/useAuth'

type EventCardPropsType = {
  event: Event
  isLoading: boolean
  onDelete: (id: number) => void
}

const EventCard: FC<EventCardPropsType> = ({ event, isLoading, onDelete }) => {
  const mouth = getSepareteDate(event.inicialDate)
  const { user } = useAuth()
  const navigate = useNavigate()
  return (
    <li
      key={event.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg w-full max-w-[384px] xl:min-w-[384px]"
    >
      <Link to={`/event/${event.id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-medium text-zinc-900">
                {event.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="truncate text-md font-medium text-zinc-500 mb-2">
            Sobre esse evento:
          </h3>
          <p className="font-medium text-zinc-500 h-20 overflow-hidden whitespace-pre-wrap break-words">
            {event.description}
          </p>
        </div>
      </Link>

      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-primary font-bold">
        <div className="flex items-center gap-2">
          <div className="text-xl">{mouth}</div>
          <span className="h-[20px] w-[1px] bg-zinc-500" />
          <div className="flex flex-col justify-center items-center text-xs">
            <div>{getDate(event.inicialDate)}</div>
            <div>{getYear(event.inicialDate)}</div>
          </div>
        </div>
        {event.creator?.username === user?.username && (
          <>
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
              onClick={isLoading ? () => {} : () => onDelete(event.id)}
              size="sm"
              className="w-full"
              variant="destructive"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
      </div>
    </li>
  )
}

export default EventCard
