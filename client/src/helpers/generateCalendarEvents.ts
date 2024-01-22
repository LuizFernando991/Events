/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Event } from '@/types/Event'

const colorMap: Record<number, string> = {}
const colorPalette = ['#ae1637', '#008b00', '#0089a2', '#451c4b', '#ff2d1f']

function getColorByEventId(eventId: number) {
  // Verifica se já foi atribuída uma cor para o evento
  if (!colorMap[eventId]) {
    const colorIndex = eventId % colorPalette.length
    // Armazena a cor para o evento
    colorMap[eventId] = colorPalette[colorIndex]
  }
  return colorMap[eventId]
}

export default function generateEventObjects(
  event: Event,
  targetMonth: number,
  isPending?: boolean
) {
  const eventObjects = []
  const startDate = new Date(event.inicialDate)
  const endDate = new Date(event.finalDate)
  // @ts-ignore
  const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24)

  for (let i = 0; i <= daysDifference; i++) {
    const currentDay = new Date(startDate)
    currentDay.setDate(startDate.getDate() + i)

    // Verificar se o dia está no mês desejado
    if (currentDay.getMonth() === targetMonth - 1) {
      const eventObject = {
        title: event.name,
        label: getColorByEventId(event.id),
        day: currentDay.getTime(),
        eventId: event.id,
        isPending: !!isPending
      }

      eventObjects.push(eventObject)
    }
  }

  return eventObjects
}
