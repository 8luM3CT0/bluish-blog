//front-end
import {
  ChevronLeftIcon,
  MenuIcon,
  PaperAirplaneIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon
} from '@heroicons/react/outline'
import { House } from '@material-ui/icons'
import { DateRangePicker } from 'react-date-range'
//back-end
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MapHeader ({ placeholder }) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [guestNumber, setGuestNumber] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const resetSearch = () => {
    setSearchInput(' ')
  }

  const handleSelect = ranges => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guestNumber
      }
    })
  }

  return (
    <header className='mapHeader'>
      <div className='space-x-3 flex items-center'>
        <ChevronLeftIcon
          onClick={() => router.push('/')}
          className='
                h-8 
                cursor-pointer
                text-gray-200 
                active:text-gray-400'
        />
        <div className='mapLogo' onClick={() => router.push('/map')}>
          <PaperAirplaneIcon className='h-8 mr-2' />
          <h2
            className='
                text-lg 
                font-semibold '
          >
            Places to stay
          </h2>
        </div>
      </div>
      <div
        className='
      flex-grow
      flex
      items-center
      rounded-full
      md:border-2
      md:shadow-md
      py-2
      '
      >
        <input
          value={searchInput}
          onChange={t => setSearchInput(t.target.value)}
          placeholder={placeholder || 'Start your search...'}
          type='text'
          className='mapSearch'
        />
        <SearchIcon
          className='
      hidden
      md:inline-flex
      h-8
      cursor-pointer
      bg-blue-200
      rounded-full
      text-gray-700
      md:mx-2
      '
        />
      </div>
      <div
        className='
      justify-end
      space-x-4
      text-blue-100
      flex
      items-center
      '
      >
        <p className='hidden md:inline-flex cursor-pointer text-blue-100'>
          Start hosting
        </p>
        <House className='mapLink' />
        <div
          className='
      flex
      items-center
      space-x-2
      border-2
      p-2
      rounded-full
      '
        >
          <MenuIcon className='mapLink' />
          <UserCircleIcon className='mapLink' />
        </div>
      </div>
      {searchInput && (
        <div
          className='
        flex
        flex-col
        col-span-3
        mx-auto
        mt-1
        '
        >
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#374151']}
            onChange={handleSelect}
          />
          <div
            className='
          flex
          items-center
          border-b-2
          my-4
          border-gray-700
          '
          >
            <h2
              className='
            text-2xl
            pl-2
            flex-grow
            font-semibold
            text-blue-200
            '
            >
              Guests:
            </h2>
            <UsersIcon
              className='
            h-5 
            mr-1 
            text-blue-100'
            />
            <input
              value={guestNumber}
              min={1}
              onChange={t => setGuestNumber(t.target.value)}
              type='number'
              className='
            w-12
            pl-2
            text-lg
            outline-none
            text-gray-600'
            />
          </div>
          <div className='flex'>
            <button
              onClick={resetSearch}
              className='
            flex-grow
            text-red-400
            '
            >
              Cancel
            </button>
            <button
              onClick={search}
              className='
            flex-grow
            text-blue-400
            '
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default MapHeader
