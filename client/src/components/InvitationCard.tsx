import { Invitation } from '@/types/Invitation'
import { Check, CheckCircle, Loader2, X, XCircle } from 'lucide-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export type InvitationCardProps = {
  invitation: Invitation
  respondInvitation: (invitationId: number, accept: boolean) => Promise<void>
}

const InvitationCard: FC<InvitationCardProps> = ({
  invitation,
  respondInvitation
}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const redirect = () => {
    if (invitation.status === 'opening') {
      navigate(`/event/${invitation.eventId}`)
    }
  }
  const onSubmit = async (accept: boolean) => {
    setIsLoading(true)
    try {
      await respondInvitation(invitation.id, accept)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <li
      onClick={redirect}
      className={`p-3 w-full border-b border-gray-300 ${invitation.status === 'rejected' ? 'bg-rose-100' : 'bg-slate-200 cursor-pointer'}`}
    >
      <div className="flex text-left justify-between">
        <p className="text-sm text-black font-semibold">{`${invitation.fromUser.name} convidou você para um evento`}</p>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-3 w-3 animate-spin" />
          </div>
        ) : (
          <div className="flex">
            {!['rejected', 'accept'].includes(invitation.status) ? (
              <>
                <Button variant="ghost" onClick={() => onSubmit(true)}>
                  <Check />
                </Button>
                <Button variant="ghost" onClick={() => onSubmit(false)}>
                  <X />
                </Button>
              </>
            ) : (
              <div className="flex items-center text-gray-300">
                {invitation.status === 'rejected' ? (
                  <XCircle />
                ) : (
                  <CheckCircle />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default InvitationCard
