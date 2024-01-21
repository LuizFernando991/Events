import { FC, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormType } from '@/types/Event'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'

type EventFormPropsType = {
  handleSubmit: () => void
  isLoading: boolean
  register: UseFormRegister<FormType>
  errors: FieldErrors<FormType>
  setValue: UseFormSetValue<FormType>
  defaultDate?: {
    defautInicialDate: Date
    defaultFinalDate: Date
  }
  defaultFinalTime?: string
  defaultInicialTime?: string
  submitButtonTitle?: string
}

const EventForm: FC<EventFormPropsType> = ({
  handleSubmit,
  register,
  errors,
  setValue,
  isLoading,
  defaultDate,
  defaultInicialTime,
  defaultFinalTime,
  submitButtonTitle = 'Criar'
}) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [time, setTime] = useState<string[]>([])

  useEffect(() => {
    setValue('inicialDate', date?.from)
    setValue('finalDate', date?.to)
  }, [date, setValue])

  useEffect(() => {
    setValue('inicialTime', time[0])
    setValue('finalTime', time[1])
  }, [setValue, time])

  useEffect(() => {
    setDate(
      defaultDate
        ? {
            from: defaultDate.defautInicialDate,
            to: defaultDate.defaultFinalDate
          }
        : undefined
    )
  }, [defaultDate])

  useEffect(() => {
    if (defaultFinalTime && defaultInicialTime)
      setTime([defaultInicialTime, defaultFinalTime])
  }, [defaultFinalTime, defaultInicialTime])

  const formatedDateFrom = date?.from ? format(date?.from, 'dd, LLL, y') : null
  const formatedDateTo = date?.to ? format(date?.to, 'dd, LLL, y') : null

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-1 items-center w-full bg-white p-10"
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Qual o nome do seu evento?</Label>
        <Input
          {...register('name', { required: 'Campo obrigatório' })}
          id="name"
          placeholder="Ex: Festa na casa do Lucas!"
          className={errors.name ? 'border-rose-500' : ''}
        />
        <p
          className={`text-sm text-rose-400 ${errors['name']?.message ? ' ' : 'invisible'}`}
        >
          {errors['name']?.message || 'placeholder error'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="date" className="flex items-center gap-4">
          Quando será evento? <CalendarIcon />
        </Label>
        <div className="flex flex-col space-y-1.5 w-full items-center">
          <div className={cn('grid gap-2')}>
            <Calendar
              id="date"
              mode="range"
              defaultMonth={
                defaultDate?.defautInicialDate
                  ? new Date(defaultDate.defautInicialDate)
                  : undefined
              }
              selected={date}
              onSelect={setDate}
              numberOfMonths={3}
            />
          </div>
          <p
            className={`text-md text-zinc-500 font-bold ${!date ? 'invisible' : ''}`}
          >
            O evento ocorrerá{' '}
            {date?.from && date.to && formatedDateFrom !== formatedDateTo
              ? 'entre'
              : 'em'}
            :{' '}
            <span className="text-primary">
              {date?.from && formatedDateFrom}
            </span>
            {date?.from &&
              date.to &&
              formatedDateFrom !== formatedDateTo &&
              '  e  '}
            <span className="text-primary">
              {date?.to &&
                date?.from &&
                formatedDateFrom !== formatedDateTo &&
                formatedDateTo}
            </span>
          </p>
          <p
            className={`text-md font-semibold text-rose-400 ${errors['inicialDate']?.message || errors['finalDate']?.message ? ' ' : 'invisible'}`}
          >
            {errors['inicialDate']?.message || 'placeholder error'}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="description">
          Em qual horário seu evento acontece?{' '}
        </Label>
        <TimePicker.RangePicker
          format={'HH:mm'}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={
            time[0] && time[1]
              ? time.map((e) => {
                  return dayjs(e + ':00', 'HH:mm:ss')
                })
              : undefined
          }
          onChange={(value) => {
            if (value) {
              const stringsTime = value.map((obj) => {
                return obj ? `${obj.format('HH:mm:00')}` : ''
              })
              setTime(stringsTime)
            } else {
              setTime(['', ''])
            }
          }}
        />
        <p
          className={`text-sm text-rose-400 ${errors['description']?.message ? ' ' : 'invisible'}`}
        >
          {errors['description']?.message || 'placeholder error'}
        </p>
      </div>
      <div className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="description">Descreva seu evento: </Label>
        <Textarea
          {...register('description', { required: 'Campo obrigatório' })}
          id="description"
          cols={12}
          placeholder="Descreva aqui o que terá no seu evento!"
          className={
            errors.description
              ? 'border-rose-500 min-h-[520px] resize-none'
              : 'min-h-[520px] resize-none'
          }
        />
        <p
          className={`text-sm text-rose-400 ${errors['description']?.message ? ' ' : 'invisible'}`}
        >
          {errors['description']?.message || 'placeholder error'}
        </p>
      </div>
      <div className="flex flex-col space-y-1.5 w-full items-end">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="max-w-[300px] w-full"
        >
          {submitButtonTitle}
        </Button>
      </div>
    </form>
  )
}

export default EventForm
