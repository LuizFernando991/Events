import { InvitationsContext } from '@/contexts/invitationcontext'
import { useContext } from 'react'

const useInvitations = () => {
  return useContext(InvitationsContext)
}

export default useInvitations
