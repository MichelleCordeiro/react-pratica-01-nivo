import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  pages: number
  items: number
  page: number
  perPage: number
}

export function Pagination({ items, page, pages, perPage }: PaginationProps) {
  console.log('perPage: ', perPage)

  const [, setSearchParams] = useSearchParams()

  function firstPage() {
    setSearchParams(params => {
      params.set('page', '1')

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPage() {
    setSearchParams(params => {
      params.set('page', String(pages))

      return params
    })
  }

  function setItemsPerPage(amount: string) {
    clearCacheData()

    setSearchParams(params => {
      params.set('perPage', amount)

      return params
    })
  }

  const clearCacheData = () => {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name)
      })
    })
    // alert('Complete Cache Cleared')
  }
  
  return (
    <div className='flex text-sm items-center justify-between text-zinc-500'>
      <span>Showing {perPage} of {items} items</span>
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-2'>
          <span>Rows per page</span>

          <Select value={String(perPage)} onValueChange={setItemsPerPage}>
            <SelectTrigger aria-label='Page' />
            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>
          Page {page} of {pages}
        </span>

        <div className='space-x-1.5'>
          <Button onClick={firstPage} size='icon' disabled={page - 1 <= 0}>
            <ChevronsLeft className='size-4' />
            <span className='sr-only'>First page</span>
          </Button>
          <Button onClick={previousPage} size='icon' disabled={page - 1 <= 0}>
            <ChevronLeft className='size-4' />
            <span className='sr-only'>Previous page</span>
          </Button>
          <Button onClick={nextPage} size='icon' disabled={page + 1 > pages}>
            <ChevronRight className='size-4' />
            <span className='sr-only'>Next page</span>
          </Button>
          <Button onClick={lastPage} size='icon' disabled={page + 1 > pages}>
            <ChevronsRight className='size-4' />
            <span className='sr-only'>Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
