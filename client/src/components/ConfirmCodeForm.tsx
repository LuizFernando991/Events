import { FC, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { UserConfirmRegisterType } from '@/contexts/authcontext'

type ConfirCodeFormPropsType = {
  activationToken: string
  onSubmitForm: (data: UserConfirmRegisterType) => Promise<void>
}

const ConfirmCodeForm: FC<ConfirCodeFormPropsType> = ({
  activationToken,
  onSubmitForm
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      activationToken,
      activationCode: ''
    }
  })

  const handleOnFormSubmit = async (data: {
    activationToken: string
    activationCode: string
  }) => {
    try {
      if (!activationToken) return
      await onSubmitForm({
        activationCode: data.activationCode,
        activationToken: data.activationToken
      })
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(handleOnFormSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirme seu email</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col w-full">
              <p className="mb-4">
                Enviamos o um código para seu email, confirme o códgio:
              </p>
              <div className="w-full flex justify-center flex-col items-center">
                <Input
                  {...register('activationCode', {
                    required: 'Campo obrigatório',
                    maxLength: {
                      value: 4,
                      message: 'Código inválido'
                    }
                  })}
                  id="activationCode"
                  placeholder="0000"
                  className={
                    errors.activationCode
                      ? 'border-rose-500 max-w-20 text-center flex justify-center'
                      : 'max-w-20 text-center flex justify-center'
                  }
                />
                <p
                  className={`text-sm text-rose-400 ${errors['activationCode']?.message ? ' ' : 'invisible'}`}
                >
                  {errors['activationCode']?.message || 'placeholder error'}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction disabled={isLoading} type="submit">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmCodeForm
