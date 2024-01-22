// creating a array to pagination component
const createPaginationArray = (currentPage: number, totalPages: number) => {
  const array = []

  for (let i = Math.max(1, currentPage - 3); i < currentPage; i++) {
    array.push(i)
  }

  array.push(currentPage)

  for (
    let i = currentPage + 1;
    i <= Math.min(currentPage + 3, totalPages);
    i++
  ) {
    array.push(i)
  }
  return array
}

export default createPaginationArray
