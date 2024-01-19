import { FC } from 'react'
import { Loader2 } from 'lucide-react'

const LoadingScreen: FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="h-20 w-20 animate-spin" />
      </div>
    </div>
  )
}

export default LoadingScreen
