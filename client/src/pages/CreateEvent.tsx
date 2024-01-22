import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import EventForm from '@/components/EventForm'
import { FormType } from '@/types/Event'
import { useApi } from '@/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import AlertEventDate from '@/components/AlertEventDate'
import { Event } from '@/types/Event'

const CreateEvent: FC = () => {
  const currentDate = new Date()
  const [participatEvent, setParticipatEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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
      finalDate: currentDate,
      inicialTime: '',
      finalTime: ''
    }
  })

  const onCheck = async (data: FormType) => {
    setIsLoading(true)
    if (!data.inicialTime || !data.finalDate) {
      toast({
        variant: 'destructive',
        title: 'Selecione um horário!'
      })
      setIsLoading(false)
      return
    }
    if (!data.inicialDate) {
      toast({
        variant: 'destructive',
        title: 'Selecione uma data!'
      })
      setIsLoading(false)
      return
    }
    const inicialTimeHourMin = data.inicialTime.split(':')
    const finalTimeHourMin = data.finalTime.split(':')
    data.inicialDate!.setHours(
      parseInt(inicialTimeHourMin[0]),
      parseInt(inicialTimeHourMin[1])
    )
    data.finalDate
      ? data.finalDate.setHours(
          parseInt(finalTimeHourMin[0]),
          parseInt(finalTimeHourMin[1])
        )
      : data.inicialDate!.setHours(
          parseInt(inicialTimeHourMin[0]),
          parseInt(inicialTimeHourMin[1])
        )
    if (data.inicialDate < new Date(currentDate)) {
      toast({
        variant: 'destructive',
        title: 'A data de início não pode ser anterior a hoje!'
      })
      setIsLoading(false)
      return
    }

    try {
      const inicialTimeHourMin = data.inicialTime.split(':')
      const finalTimeHourMin = data.finalTime.split(':')
      data.inicialDate!.setHours(
        parseInt(inicialTimeHourMin[0]),
        parseInt(inicialTimeHourMin[1])
      )
      data.finalDate
        ? data.finalDate.setHours(
            parseInt(finalTimeHourMin[0]),
            parseInt(finalTimeHourMin[1])
          )
        : data.inicialDate!.setHours(
            parseInt(inicialTimeHourMin[0]),
            parseInt(inicialTimeHourMin[1])
          )
      const res = await api.get('/event/geteventsuserparticipates', {
        params: {
          inicialDate: data.inicialDate.toString(),
          finalDate: data.finalDate
            ? data.finalDate.toString()
            : data.inicialDate.toString()
        }
      })
      if (res.data.events.length) {
        setIsLoading(false)
        setParticipatEvent(res.data.events[0])
        return
      }
      onSubmit(data)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormType) => {
    try {
      setIsLoading(true)
      const inicialTimeHourMin = data.inicialTime.split(':')
      const finalTimeHourMin = data.finalTime.split(':')
      data.inicialDate!.setHours(
        parseInt(inicialTimeHourMin[0]),
        parseInt(inicialTimeHourMin[1])
      )
      data.finalDate
        ? data.finalDate.setHours(
            parseInt(finalTimeHourMin[0]),
            parseInt(finalTimeHourMin[1])
          )
        : data.inicialDate!.setHours(
            parseInt(inicialTimeHourMin[0]),
            parseInt(inicialTimeHourMin[1])
          )
      await api.post('/event', {
        ...data,
        inicialDate: data.inicialDate!.toString(),
        finalDate: data.finalDate
          ? data.finalDate.toString()
          : data.inicialDate!.toString()
      })
      navigate('/dashboard')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'A data de início não pode ser anterior a hoje!'
      })
    } finally {
      setIsLoading(false)
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
        handleSubmit={handleSubmit(onCheck)}
        register={register}
        errors={errors}
        setValue={setValue}
        defaultDate={{
          defautInicialDate: getValues('inicialDate') || currentDate,
          defaultFinalDate:
            getValues('finalDate') || getValues('inicialDate') || currentDate
        }}
        isLoading={isLoading}
      />
      <AlertEventDate
        isOpen={!!participatEvent}
        setIsOpen={() => setParticipatEvent(null)}
        onSubmit={() => onSubmit(getValues())}
        isLoading={isLoading}
        title={participatEvent?.name}
      />
    </div>
  )
}

export default CreateEvent
