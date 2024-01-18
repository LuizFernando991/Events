import { Outlet } from 'react-router-dom'
import Nav from '@/components/Nav'

const NavLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Nav />
      <Outlet />
    </div>
  )
}

export default NavLayout
