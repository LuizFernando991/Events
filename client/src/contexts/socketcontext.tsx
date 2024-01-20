import { createContext, useEffect, FC, PropsWithChildren } from 'react'
import io, { Socket } from 'socket.io-client'

export type SocketProviderType = {
  socket: Socket
}

export const SocketContext = createContext({} as SocketProviderType)

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = io(import.meta.env.VITE_SOCKET_KEY, {
    withCredentials: true
  })
  useEffect(() => {
    socket.on
    return () => {
      socket.disconnect()
    }
  }, [socket])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
