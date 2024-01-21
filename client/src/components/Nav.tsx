import { Link } from 'react-router-dom'
import { Button, buttonVariants } from './ui/button'
import { ArrowRight, Bell, BellDot, Mail, MailWarning } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import useAuth from '@/hooks/useAuth'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import useNotification from '@/hooks/useNotifications'
import NotificationCard from './NotificationCard'
import useInvitations from '@/hooks/useInvitations'
import InvitationCard from './InvitationCard'

const Nav = () => {
  const { user, logout } = useAuth()
  const { notifications, haveNewNotifications, clearNotification } =
    useNotification()
  const {
    haveNewInvitations,
    invitations,
    respondInvitation,
    clearInvitations
  } = useInvitations()
  return (
    <nav className="h-15 bg-white">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-10">
        <Link to="/" className="flex z-40 font-semibold">
          <span className="text-primary font-bold">Events</span>
        </Link>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild onClick={clearInvitations}>
              <Button variant="ghost">
                {!haveNewInvitations ? <Mail /> : <MailWarning />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              {invitations.length === 0 ? (
                <div className="p-4">Sem convites </div>
              ) : (
                ''
              )}
              <ul className="max-h-[400px] overflow-y-auto">
                {invitations.map((inv) => (
                  <InvitationCard
                    invitation={inv}
                    key={inv.id}
                    respondInvitation={respondInvitation}
                  />
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          <MobileNav isAuth={!!user} onLogout={logout} />
          <Popover>
            <PopoverTrigger asChild onClick={clearNotification}>
              <Button variant="ghost">
                {!haveNewNotifications ? <Bell /> : <BellDot />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              {notifications.length === 0 ? (
                <div className="p-4">Sem notificações</div>
              ) : (
                ''
              )}
              <ul className="max-h-[400px] overflow-y-auto">
                {notifications.map((not) => (
                  <NotificationCard notification={not} key={not.id} />
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          <MobileNav isAuth={!!user} onLogout={logout} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}
                  to="/login"
                >
                  Entrar
                </Link>
                <Link
                  className={buttonVariants({
                    size: 'sm'
                  })}
                  to="/register"
                >
                  Cadastre-se <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}
                >
                  Meus eventos
                </Link>

                <UserAccountNav
                  name={!user.name ? 'Sua conta' : user.name}
                  email={user.email ?? ''}
                  imageUrl={''}
                  onLogout={logout}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
