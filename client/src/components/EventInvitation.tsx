import { FC, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { SearchedUser } from '@/types/User'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type EventInvitationPropsType = {
  isOpen: boolean
  setIsOpen: () => void
  eventId?: number
}

const EventInvitation: FC<EventInvitationPropsType> = ({
  isOpen,
  setIsOpen,
  eventId
}) => {
  const [users, setUsers] = useState<SearchedUser[]>([])
  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const api = useApi({ shouldRefreshToken: true })
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const { data } = await api.get('/user/search', { signal })

        setUsers(data)
      } catch (err) {
        //
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()

    return () => {
      controller.abort()
    }
  }, [api])

  const onUserSelect = (id: number) => {
    if (selectedUsersIds.includes(id)) {
      setSelectedUsersIds((e) => e.filter((userId) => userId !== id))
      return
    }
    setSelectedUsersIds((e) => [id, ...e])
  }

  const onSumit = async () => {
    try {
      setIsSubmitting(true)
      api.post('/invitation', { ids: selectedUsersIds, eventId })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Oh não, algo deu errado, tente mais tarde!'
      })
    } finally {
      toast({
        variant: 'default',
        title: 'Convite enviado!'
      })
      setIsSubmitting(false)
      setSelectedUsersIds([])
      setIsOpen()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] h-[90vh]  flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-8 mt-5">
            Convide pessoas para seu evento
          </DialogTitle>
        </DialogHeader>
        <div className="grow over overflow-y-auto">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="h-20 w-20 animate-spin text-zinc-500" />
            </div>
          )}
          <div>
            {users?.map((user) => (
              <div
                key={user.id}
                onClick={() => onUserSelect(user.id)}
                className={`flex gap-5 p-2 cursor-pointer ${selectedUsersIds.includes(user.id) ? 'bg-green-200' : ''}`}
              >
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
        <Button
          onClick={() => onSumit()}
          variant="default"
          disabled={!selectedUsersIds.length || isSubmitting}
        >
          Convidar {selectedUsersIds.length}{' '}
          {selectedUsersIds.length > 1 || selectedUsersIds.length === 0
            ? 'pessoas'
            : 'pessoa'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default EventInvitation
