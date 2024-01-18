import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavLayout from './layouts/NavLayout'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
