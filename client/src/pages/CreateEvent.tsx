import { FC } from 'react'
import { useForm } from 'react-hook-form'
import EventForm from '@/components/EventForm'
import { FormType } from '@/types/Event'
import { useApi } from '@/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'

const CreateEvent: FC = () => {
  const currentDate = new Date()
  const api = useApi({ shouldRefreshToken: true })
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues
  } = useForm<FormType>({
    defaultValues: {
      name: '',
      description: '',
      inicialDate: currentDate,
      finalDate: currentDate
    }
  })

  const onSubmit = async (data: FormType) => {
    if (!data.inicialDate) {
      toast({
        variant: 'destructive',
        title: 'Selecione uma data!'
      })
      return
    }
    if (data.inicialDate < new Date(currentDate.setHours(0, 0, 0, 0))) {
      toast({
        variant: 'destructive',
        title: 'A data de início não pode ser anterior a hoje!'
      })
      return
    }
    try {
      await api.post('/event', {
        ...data,
        inicialDate: data.inicialDate.toString(),
        finalDate: data.finalDate
          ? data.finalDate.toString()
          : data.inicialDate.toString()
      })
      navigate('/dashboard')
    } catch (err) {
      //
    } finally {
      //
    }
  }

  return (
    <div className="grow w-full mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-primary mr-3">
          Crie agora seu evento!
        </h1>
      </div>
      <EventForm
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
    </div>
  )
}

export default CreateEvent
