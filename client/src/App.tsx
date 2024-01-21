// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authcontext'
import NavLayout from './layouts/NavLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectRoutes from './layouts/ProtectRoutes'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import EventPage from './pages/Event'
import { SocketProvider } from './contexts/socketcontext'
import { NotificationsProvider } from './contexts/notificationscontext'
import { InvitationsProvider } from './contexts/invitationcontext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <NotificationsProvider>
            <InvitationsProvider>
              <Routes>
                <Route path="/" element={<NavLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<ProtectRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events/create" element={<CreateEvent />} />
                    <Route path="/event/:id" element={<EventPage />} />
                    <Route path="/event/edit/:id" element={<EditEvent />} />
                  </Route>
                </Route>
              </Routes>
            </InvitationsProvider>
          </NotificationsProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
