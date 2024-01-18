import { Link } from 'react-router-dom'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import useAuth from '@/hooks/useAuth'

const Nav = () => {
  const { user, logout } = useAuth() // get user
  return (
    <nav className="h-15">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-10">
        <Link to="/" className="flex z-40 font-semibold">
          <span className="text-primary font-bold">Events</span>
        </Link>

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
    </nav>
  )
}

export default Nav
