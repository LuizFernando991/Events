import { Link } from 'react-router-dom'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'

const Nav = () => {
  const user = null // get user
  return (
    <nav className="h-[10vh]">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-10">
        <Link to="/" className="flex z-40 font-semibold">
          <span className="text-primary font-bold">Events</span>
        </Link>

        <MobileNav isAuth={!!user} />

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
                Dashboard
              </Link>

              <UserAccountNav
                name={!user.name ? 'Sua conta' : user.name}
                email={user.email ?? ''}
                imageUrl={user.profile ?? ''}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
