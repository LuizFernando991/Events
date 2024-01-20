import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EventForm from '@/components/EventForm'
import { Event, FormType } from '@/types/Event'
import { useApi } from '@/hooks/useApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import AlertEventDate from '@/components/AlertEventDate'

const EditEvent: FC = () => {
  const currentDate = new Date()
  const [title, setTitle] = useState('')
  const [defaultDate, setDefaultDate] = useState({
    defautInicialDate: currentDate,
    defaultFinalDate: currentDate
  })
  const [isLoading, setIsLoading] = useState(false)
  const [participatEvent, setParticipatEvent] = useState<Event | null>(null)
  const api = useApi({ shouldRefreshToken: true })
  const navigate = useNavigate()
  const { id } = useParams()
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
      inicialDate: undefined,
      finalDate: undefined
    }
  })

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/event/${id}`)
      const inicialDate = new Date(res.data.inicialDate)
      const finalDate = new Date(res.data.finalDate)
      setValue('name', res.data.name)
      setValue('description', res.data.description)
      setValue('inicialDate', inicialDate)
      setValue('finalDate', finalDate)
      setTitle(res.data.name)
      setDefaultDate({
        defautInicialDate: inicialDate,
        defaultFinalDate: finalDate
      })
    }
    fetchEvent()
  }, [api, id, setValue])

  const onCheck = async (data: FormType) => {
    setIsLoading(true)
    if (!data.inicialDate) {
      toast({
        variant: 'destructive',
        title: 'Selecione uma data!'
      })
      setIsLoading(false)
      return
    }
    if (data.inicialDate < new Date(currentDate.setHours(0, 0, 0, 0))) {
      toast({
        variant: 'destructive',
        title: 'A data de início não pode ser anterior a hoje!'
      })
      setIsLoading(false)
      return
    }
    try {
      const res = await api.get('/event/geteventsuserparticipates', {
        params: {
          inicialDate: data.inicialDate.toDateString(),
          finalDate: data.finalDate ? data.finalDate : data.inicialDate
        }
      })
      if (res.data.events.length && id && res.data.events[0].id !== +id) {
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
    setIsLoading(true)
    try {
      await api.put(`/event/${id}`, {
        ...data,
        inicialDate: data.inicialDate!.toDateString(),
        finalDate: data.finalDate
          ? data.finalDate.toDateString()
          : data.inicialDate!.toDateString()
      })
      navigate(`/event/${id}`)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'A data de início não pode ser anterior a hoje!'
      })
    } finally {
      setParticipatEvent(null)
      setIsLoading(false)
    }
  }

  return (
    <div className="grow w-full mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-primary mr-3">
          Editando: {title}
        </h1>
      </div>
      <EventForm
        handleSubmit={handleSubmit(onCheck)}
        register={register}
        errors={errors}
        setValue={setValue}
        defaultDate={defaultDate}
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

export default EditEvent
