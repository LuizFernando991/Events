import { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { CalendarEventType } from '@/types/CalendatEventType'

type ViewDayPropsType = {
  isOpen: boolean
  setIsOpen: () => void
  dayEvents: CalendarEventType[]
}

const ViewDay: FC<ViewDayPropsType> = ({ isOpen, setIsOpen, dayEvents }) => {
  const navigate = useNavigate()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-8">Eventos nesse dia:</DialogTitle>
          {dayEvents?.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/event/${evt.eventId}`)}
              style={{ backgroundColor: evt.label }}
              className={`p-1 mr-3 text-white text-sm md:text-sm rounded mb-1 truncate cursor-pointer`}
            >
              {evt.title}
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewDay
