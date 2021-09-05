//front-end
import Image from 'next/image'
//back-end

function MapBanner () {
  return (
    <div
      className='
        relative
        h-[300px]
        sm:h-[400px]
        lg:h-[500px]
        xl:h-[600px]
        2xl:h-[700px]
        '
    >
      <Image
        src='https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/woodland-rapture-jane-small.jpg'
        layout='fill'
        objectFit='cover'
      />
      <div
        className='
            absolute
            top-1/2
            w-full
            text-center
            '
      >
        <p
          className='
          text-blue-100
                text-sm
                sm:text-lg
                '
        >
          Still confused as to where to go ? That's ok
        </p>
        <button
          className='
                py-4
                px-10
                shadow-md
                bg-gray-50
                text-gray-800
                rounded-full
                font-bold
                my-3
                hover:shadow-xl
                active:scale-90
                transition
                duration-200
                '
        >
          I'm flexible
        </button>
      </div>
    </div>
  )
}

export default MapBanner
