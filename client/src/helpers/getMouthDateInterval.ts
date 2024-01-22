import { startOfMonth, endOfMonth, getYear } from 'date-fns'
// Getting date in first and last days of the month
export default function getFirstAndLastDayOfMonth(month: number) {
  month = Math.min(Math.max(1, month), 12)

  const currentYear = getYear(new Date())

  const firstDay = startOfMonth(new Date(currentYear, month - 1))

  const lastDay = endOfMonth(new Date(currentYear, month - 1))

  return [firstDay, lastDay]
}
