import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/authcontext'
import NavLayout from './layouts/NavLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <NavLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
