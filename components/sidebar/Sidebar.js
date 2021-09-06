//front-end
import { ScissorsIcon, SearchIcon } from '@heroicons/react/outline'
import PostBox from './post-box/PostBox'
//back-end
import { auth, store } from '../../firebase-file/firebaseFile'
import { useAuthState } from 'react-firebase-hooks/auth'

function Sidebar () {
  const [user] = useAuthState(auth)

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
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3 mt-5'>
            <img
              alt='user pic'
              src={user?.photoURL}
              className='rounded-xl border-2 border-gray-700 cursor-pointer'
              height={60}
              width={60}
              objectFit='contain'
            />
            <div className='flex-col ml-3'>
              <h3 className='text-gray-400 font-semibold text-lg'>
                {user?.displayName}
              </h3>
              <h4 className='hidden xl:inline-flex text-blue-100 font-medium text-sm'>
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
        <div className='mt-6'>
          <PostBox />
        </div>
      </div>
      <div className=' flex flex-col text-center mb-4 space-x-4'>
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
