//front-end
import { EmojiHappyIcon } from '@heroicons/react/solid'
//back-end

function Welcome () {
  return (
    <div
      className='
        hidden
        xl:grid
        h-screen 
        flex-1
        place-items-center 
        bg-gray-700'
    >
      <div
        className='
            grid
            rounded-xl
            p-28
            bg-gray-800
            place-items-center
            text-center
            '
      >
        <EmojiHappyIcon
          className='
        text-blue-200
        h-20
        animate-bounce
        '
        />
        <h1
          className='
        text-xl 
        font-bold 
        text-blue-300 
        animate-pulse
        mt-2
        '
        >
          Hello & Welcome !
        </h1>
        <h2
          className='
        text-lg
        font-semibold
        text-blue-400
        animate-pulse
        mt-2
        '
        >
          To start, either add a user by the icon at the sidebar
        </h2>
        <h3
          className='
        text-md
        font-medium
        text-blue-500
        animate-pulse
        mt-2
        '
        >
          Or just press on the current users you have
        </h3>
      </div>
    </div>
  )
}

export default Welcome
