import { FC } from 'react'
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import createPaginationArray from '@/helpers/createPaginationArray'

type PaginationPropsType = {
  totalPages: number
  currentPage: number
  onPageClick: (pageNumber: number) => void
}

const Pagination: FC<PaginationPropsType> = ({
  currentPage,
  totalPages,
  onPageClick
}) => {
  return (
    <PaginationContainer>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => onPageClick(--currentPage)} />
          </PaginationItem>
        )}
        {currentPage >= 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {createPaginationArray(currentPage, totalPages).map((pageNumber) => (
          <PaginationItem
            key={pageNumber}
            onClick={() => onPageClick(pageNumber)}
          >
            <PaginationLink
              className={`${currentPage === pageNumber ? 'bg-primary text-white' : 'cursor-pointer'}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage !== totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => onPageClick(++currentPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationContainer>
  )
}

export default Pagination
