//front-end
import {
  HomeIcon,
  LocationMarkerIcon,
  MailIcon,
  ScissorsIcon,
  SearchIcon
} from '@heroicons/react/outline'
import PostBox from './post-box/PostBox'
//back-end
import { auth, store } from '../../firebase-file/firebaseFile'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

function Sidebar () {
  const [user] = useAuthState(auth)
  const router = useRouter()

  return (
    <div className='sidebarDiv'>
      {/**header */}
      <div
        className='
            top-0 
            sticky 
            p-12
            '
      >
        {/**search */}
        <div className='searchbarDiv'>
          <input type='text' className='searchInput' placeholder='Search' />
          <SearchIcon className='h-7 text-gray-500 mr-3' />
        </div>
        {/**User */}
        <div className='grid md:flex md:justify-between items-center space-x-3'>
          <div className='grid md:flex md:items-center space-x-3 mt-5 md:mb-4'>
            <img
              alt='user pic'
              src={user?.photoURL}
              className='h-20 w-20 rounded-xl border-2 mr-2 border-gray-700 cursor-pointer'
              height={60}
              width={60}
              objectFit='contain'
            />
            <div className='flex-col ml-3'>
              <h3 className='hidden lg:inline-flexflex text-gray-400 font-semibold text-lg'>
                {user?.displayName}
              </h3>
              <h4 className='hidden md:flex text-blue-100 font-medium text-sm'>
                {user?.email}
              </h4>
            </div>
          </div>
          <ScissorsIcon
            onClick={() => auth.signOut()}
            className='h-10 text-gray-600 text-lg cursor-pointer active:text-gray-500'
          />
        </div>
        {/**PostBox */}
        <div className='hidden md:inline-flex mt-6'>
          <PostBox />
        </div>
      </div>
      <div
        className='
      flex
      flex-col
      items-center
      mb-4
      md:hidden
      '
      >
        <div onClick={() => router.push('/')} className='sidebarLink'>
          <HomeIcon className='h-8 text-blue-200' />
          <h2 className='hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Home
          </h2>
        </div>
        <div onClick={() => router.push('/chat')} className='sidebarLink'>
          <MailIcon className='h-8 text-blue-200' />
          <h2 className=' hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Direct messages
          </h2>
        </div>
        <div onClick={() => router.push('/map')} className='sidebarLink'>
          <LocationMarkerIcon className='h-8 text-blue-200' />
          <h2 className=' hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Places to stay
          </h2>
        </div>
      </div>
      <div className='hidden md:inline-flex flex-col text-center mb-4 space-x-4'>
        <h2 className='text-blue-400 font-semibold text-lg'>
          A bloggy social network
        </h2>
        <h2 className='text-blue-400 font-semibold text-lg'>
          Made with NextJS & @heroicons-react
        </h2>
        <h2 className='text-blue-400 font-semibold text-lg'>
          Developed by me, 8luM3CT0
        </h2>
      </div>
    </div>
  )
}

export default Sidebar
