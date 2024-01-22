// Returns a String through date
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
  const month = m[dateObj.getMonth()]

  return month
}

export default getSepareteDate
