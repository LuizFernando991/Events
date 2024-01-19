const getSepareteDate = (date: string | Date) => {
  const m = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ'
  ]
  const dateObj = new Date(date)
  const month = m[dateObj.getUTCMonth()]
  const day = dateObj.getDay()
  const year = dateObj.getFullYear()
  return {
    month,
    day,
    year
  }
}

export default getSepareteDate
