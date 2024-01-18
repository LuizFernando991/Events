import { Outlet } from 'react-router-dom'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/toaster'

const NavLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Nav />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default NavLayout
