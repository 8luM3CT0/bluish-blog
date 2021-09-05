//front-end
import MapHeader from '../components/map/map-header/MapHeader'
import SearchResults from '../components/map/search-result/SearchResults'
import MapArea from '../components/map/search-result/map-area/MapArea'
//back-end
import { useRouter } from 'next/router'
import searches from '../public/searches'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

function Search () {
  const router = useRouter()
  const { location, startDate, endDate, guestNumber } = router.query
  const [data, setData] = useState([])

  const formattedStartDay = format(new Date(startDate), 'dd MMMM yy')
  const formattedEndDay = format(new Date(endDate), 'dd MMMM yy')

  const range = `${formattedStartDay} - ${formattedEndDay}`

  return (
    <div
      className='
        h-screen
        bg-gray-900
        overflow-y-scroll
        scrollbar-hide
        '
    >
      <MapHeader
        placeholder={`${location} | ${range} | ${guestNumber} guests`}
      />
      <main className='flex'>
        <section
          className='
        flex-grow
        pt-14
        px-6
        '
        >
          <p
            className='
          text-xs
          text-blue-100
          '
          >
            300+ stays - {range} - for {guestNumber} guests
          </p>
          <h1
            className='
          text-3xl
          text-blue-200
          font-semibold
          mt-2
          mb-6
          '
          >
            Stays in {location}
          </h1>
          <div
            className='
            hidden
            lg:inline-flex
            mb-5
            space-x-3
            text-gray-700
            whitespace-nowrap
            '
          >
            <p className='mapSearchOption'>Cancellation options</p>
            <p className='mapSearchOption'>Price</p>
            <p className='mapSearchOption'>Domicile type</p>
            <p className='mapSearchOption'>Rooms & sleeping area</p>
            <p className='mapSearchOption'>More stuff</p>
          </div>
          {/**searchResults */}
          <div
            className='
            flex
            flex-col
            min-h-[90vh]
            '
          >
            {/**test data*/}
            {searches &&
              searches.map(
                ({
                  img,
                  title,
                  location,
                  description,
                  fullPrice,
                  star,
                  price,
                  long,
                  lat
                }) => (
                  <SearchResults
                    key={img}
                    img={img}
                    title={title}
                    location={location}
                    description={description}
                    fullPrice={fullPrice}
                    star={star}
                    price={price}
                    long={long}
                    lat={lat}
                  />
                )
              )}
          </div>
        </section>
        <section className='hidden lg:inline-flex lg:min-w-[600px]'>
          <MapArea searchRes={searches} />
        </section>
      </main>
    </div>
  )
}

export default Search
