import { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type AlertEventDatePropsType = {
  isOpen: boolean
  isLoading: boolean
  setIsOpen: () => void
  onSubmit: () => void
  title: string | undefined
}

const AlertEventDate: FC<AlertEventDatePropsType> = ({
  isOpen,
  isLoading,
  setIsOpen,
  onSubmit,
  title
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? () => {} : setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-8">
            Você já está participando de um evento!
          </DialogTitle>
          <div>
            <div>
              Nessa data você estará participando do evento:{' '}
              <span className="font-bold text-black">{title}</span>, tem certeza
              que ainda deseja continuar?
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
              }}
            >
              <Button
                className="mt-8 w-full"
                variant="default"
                type="submit"
                disabled={isLoading}
              >
                Confirmar
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AlertEventDate
