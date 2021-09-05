//front-end
import Image from 'next/image'
//back-end

function SmallCard ({ img, location, distance }) {
  return (
    <div className='nearbyPlaces'>
      <div
        className='
            relative
            h-16
            w-16
            '
      >
        <Image src={img} layout='fill' className='rounded-lg' />
      </div>
      <div>
        <h2
          className=' 
        text-gray-100 
        font-bold'
        >
          {location}
        </h2>
        <h3
          className='
                font-medium
                text-blue-300
                '
        >
          {distance}
        </h3>
      </div>
    </div>
  )
}

export default SmallCard
