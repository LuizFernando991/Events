import { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Participant } from '@/types/Participant'
import { Loader2 } from 'lucide-react'

type EventParticipationsPropsType = {
  isOpen: boolean
  isLoading: boolean
  setIsOpen: () => void
  participations: Participant[] | null
}

const EventParticipations: FC<EventParticipationsPropsType> = ({
  isOpen,
  isLoading,
  setIsOpen,
  participations
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] h-[90vh]  flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-8 mt-5">
            Veja quem está participando desse evento!
          </DialogTitle>
        </DialogHeader>
        <div className="grow over overflow-y-auto">
          {isLoading && <Loader2 className="h-20 w-20 animate-spin" />}
          <div>
            {participations?.map((user) => (
              <div className="flex gap-5 p-2">
                <div className="h-10 w-10 flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 uppercase items-center justify-center text-lg font-semibold text-white">
                  {user.name.split('')[0]}
                </div>
                <div className="flex flex-col text-left">
                  <p className="text-md md:text-lg text-black font-semibold">
                    {user.username}
                  </p>
                  <p className="text-sm">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventParticipations
