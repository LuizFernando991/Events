'use client'

import { ArrowRight, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MobileNav = ({
  isAuth,
  onLogout
}: {
  isAuth: boolean
  onLogout: () => Promise<void>
}) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = useLocation().pathname

  useEffect(() => {
    if (isOpen) toggleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
    <div className="sm:hidden z-10">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700 cursor-pointer"
      />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-6 px-10 pt-20 pb-8">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    className="flex items-center w-full font-semibold text-green-600"
                    to="/register"
                  >
                    Cadastre-se
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    className="flex items-center w-full font-semibold"
                    to="/login"
                  >
                    Entrar
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className="flex items-center w-full font-semibold"
                    to="/dashboard"
                  >
                    Meus eventos
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className="flex items-center w-full font-semibold"
                    to="/events"
                  >
                    Novos eventos
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <button
                    className="flex items-center w-full font-semibold"
                    onClick={() => onLogout()}
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
