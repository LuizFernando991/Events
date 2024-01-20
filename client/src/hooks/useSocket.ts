import { useContext } from 'react'
import { SocketContext } from '@/contexts/socketcontext'

const useSocket = () => {
  const { socket } = useContext(SocketContext)
  return socket
}

export default useSocket
