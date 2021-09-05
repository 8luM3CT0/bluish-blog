import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
//back-end

function SearchResults ({
  img,
  location,
  title,
  description,
  total,
  star,
  price,
  long,
  lat
}) {
  return (
    <div
      className='
    flex
    cursor-pointer
    py-7
    px-2
    border-b
    hover:opacity-90
    hover:shadow-lg
    transition
    duration-200
    ease-out
    first:border-t
    '
    >
      <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
        <Image
          src={img}
          layout='fill'
          objectFit='cover'
          className='rounded-2xl'
        />
      </div>
      {/**Text */}
      <div
        className='
      flex 
    flex-col
    flex-grow
    pl-5'
      >
        <div className='flex justify-between'>
          <p className='text-blue-100'>{location}</p>
          <HeartIcon className='h-7 cursor-pointer text-blue-300' />
        </div>

        <h4 className='text-xl text-blue-100'>{title}</h4>

        <div className='border-b w-10 pt-2' />

        <p
          className='
        pt-2
        text-sm
        text-blue-200
        flex-grow
        '
        >
          {description}
        </p>
        <div
          className='
        flex 
        justify-between
        items-end
        pt-5
        '
        >
          <p className='flex items-center text-blue-200'>
            <StarIcon className='h-5 text-blue-400' />
            {star}
          </p>

          <div>
            <p className='text-lg font-semibold pb-2 text-blue-100 lg:text-2xl'>
              {price}
            </p>
            <p className='text-right font-extralight text-blue-200'>{total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
