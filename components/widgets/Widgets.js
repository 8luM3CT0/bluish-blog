//front-end
import {
  CogIcon,
  HomeIcon,
  MailIcon,
  ShoppingBagIcon,
  LocationMarkerIcon,
  FilmIcon,
  UsersIcon,
  ViewListIcon
} from '@heroicons/react/outline'
import Hashtag from './hashtags/Hashtag'
import WidgetTitle from './widget-title/WidgetTitle'
import { useRouter } from 'next/router'
//back-end

function Widgets () {
  const router = useRouter()
  return (
    <div className='widgetsDiv'>
      <div
        className='
        grid
        mt-2
        pb-2
        justify-evenly
        border-b-2
        border-gray-600
      '
      >
        <div
          onClick={() => router.push('/')}
          className='
        flex
        items-center
        space-x-4
        py-2
        cursor-pointer
        hover:text-blue-100
        '
        >
          <HomeIcon className='h-7 lg:h-10 text-blue-200' />
          <h2 className='hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Home
          </h2>
        </div>
        <div
          onClick={() => router.push('/chat')}
          className='
        flex 
        items-center 
        space-x-4
        py-2 
        cursor-pointer 
        hover:text-blue-100'
        >
          <MailIcon className='h-7 lg:h-10 text-blue-200' />
          <h2 className=' hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Direct messages
          </h2>
        </div>
        <WidgetTitle Icon={ShoppingBagIcon} title='Marketplace' />
        <div
          onClick={() => router.push('/map')}
          className='
        flex 
        items-center 
        space-x-4
        py-2 
        cursor-pointer 
        hover:text-blue-100'
        >
          <LocationMarkerIcon className='h-7 lg:h-10 text-blue-200' />
          <h2 className=' hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Places to stay
          </h2>
        </div>
        <div
          onClick={() => router.push('/')}
          className='
        flex
        items-center
        space-x-4
        py-2
        cursor-pointer
        hover:text-blue-100
        '
        >
          <FilmIcon className='h-7 lg:h-10 text-blue-200' />
          <h2 className='hidden xl:inline-flex font-semibold text-blue-200 h-8'>
            Entertainment
          </h2>
        </div>
        <WidgetTitle Icon={ViewListIcon} title='Lists' />
      </div>
      <div
        className='
      grid
      mt-2
      justify-evenly
      border-b-2
      border-gray-600
      '
      >
        <Hashtag title='Computer science' />
        <Hashtag title='Programming' />
        <Hashtag title='Software technology' />
        <Hashtag title='Data science' />
        <Hashtag title='Cryptocurrency' />
        <Hashtag title='Web development' />
      </div>
      <div
        className='
      grid
      mt-2
      justify-evenly
      '
      >
        <WidgetTitle Icon={CogIcon} title='Preferences' />
        <WidgetTitle Icon={UsersIcon} title='Follow and follows' />
      </div>
    </div>
  )
}

export default Widgets
