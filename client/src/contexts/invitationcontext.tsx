import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react'
import useSocket from '../hooks/useSocket'
import { toast } from '@/components/ui/use-toast'

import { useApi } from '@/hooks/useApi'
import useAuth from '@/hooks/useAuth'
import { Invitation } from '@/types/Invitation'
import { useLocation } from 'react-router-dom'

export type InvitationsProviderType = {
  invitations: Invitation[]
  haveNewInvitations: boolean
  clearInvitations: () => void
  respondInvitation: (invitationId: number, accept: boolean) => Promise<void>
}

export const InvitationsContext = createContext({} as InvitationsProviderType)

export const InvitationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useSocket()
  const { user } = useAuth()
  const api = useApi({ shouldRefreshToken: true })
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [haveNewInvitations, setHavenewInvitations] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    if (socket && user) {
      socket.on('invitation', (data: Invitation) => {
        setInvitations((e) => [data, ...e])
        setHavenewInvitations(true)
        toast({
          variant: 'default',
          title: `${data.fromUser.name} convidou você para participar de um evento. Confira`
        })
      })
    }
  }, [socket, user])

  useEffect(() => {
    if (!user) return
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/invitation')
        setInvitations(data)
        if (data.length > 0) {
          setHavenewInvitations(true)
        }
      } catch (err) {
        //
      }
    }
    fetchNotifications()
  }, [api, user])

  const clearInvitations = () => {
    if (invitations.length === 0 || !haveNewInvitations || !user) return
    setHavenewInvitations(false)
  }

  const respondInvitation = async (
    invitationId: number,
    accept: boolean
  ): Promise<void> => {
    try {
      await api.put('/invitation', { invitationId, accept })
      const updatedInvites = invitations.map((e) => {
        if (e.id === invitationId) {
          return { ...e, status: accept ? 'accept' : 'rejected' }
        }
        return e
      })
      setInvitations(updatedInvites)
      const eventInvitaion = invitations.filter((obj) => obj.eventId)
      if (pathname === `/event/${eventInvitaion[0].eventId}`) {
        window.location.reload()
      }
      return
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado, tente mais tarde'
      })
    }
    return
  }

  return (
    <InvitationsContext.Provider
      value={{
        invitations,
        haveNewInvitations,
        clearInvitations,
        respondInvitation
      }}
    >
      {children}
    </InvitationsContext.Provider>
  )
}
