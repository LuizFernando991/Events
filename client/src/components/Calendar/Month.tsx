import React, { FC } from 'react'
import dayjs from 'dayjs'
import Day from './Days'
import { CalendarEventType } from '@/types/CalendatEventType'

type MonthPropsType = {
  month?: dayjs.Dayjs[][]
  events: CalendarEventType[]
}

const Month: FC<MonthPropsType> = ({ month, events }) => {
  if (!month) return <></>
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 h-full">
      {month?.map((row, i) => (
        <React.Fragment key={i}>
          {row?.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} events={events} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Month
