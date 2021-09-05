//front-end
import Image from 'next/image'
import {
  GlobeIcon,
  InformationCircleIcon,
  ReplyIcon,
  StarIcon,
  DotsHorizontalIcon
} from '@heroicons/react/outline'
import { Loop } from '@material-ui/icons'
import Timeago from 'timeago-react'
//back-end
import { forwardRef } from 'react'
import { auth, store } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Post = forwardRef(
  ({ email, photoURL, name, timestamp, post, postImage }, ref) => {
    const [user] = useAuthState(auth)
    return (
      <div
        className='
        flex 
        flex-col 
        mt-3 
        mb-3 
        border-t-2 
        border-b-2 
        border-gray-600 
        bg-gray-700'
        ref={ref}
      >
        <div
          className='
      p-5 
      mt-5 
      rounded-t-2xl 
      items-center'
        >
          <div className='flex items-center space-x-2'>
            <img
              src={photoURL}
              alt=''
              width={40}
              height={40}
              className='rounded-full'
            />
            <div className='justify-between flex items-center flex-1'>
              <div className='items-center flex'>
                <p className='font-medium text-md text-gray-100 mr-3'>{name}</p>
                <p className='hidden lg:inline-flex font-medium text-sm text-gray-500'>
                  {email}
                </p>
              </div>
              {timestamp ? (
                <p className='hidden xl:inline-flex text-xs text-gray-500 font-semibold items-center'>
                  <GlobeIcon className='text-gray-500 mr-2 h-4' />
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </p>
              ) : (
                <p className='text-xs text-gray-500'>
                  <InformationCircleIcon className='text-gray-500 mr-2 h-4 animate-spin' />
                  Loading...
                </p>
              )}
            </div>
          </div>
          <p className='pt-4 text-gray-100'>{post}</p>
        </div>
        {postImage && (
          <div
            className='
          relative 
          h-56 
          md:h-96  
          '
          >
            <Image
              src={postImage}
              layout='fill'
              objectFit='cover'
              alt=''
              className=''
            />
          </div>
        )}
        <div className='postFooter'>
          <div className='postBtn'>
            <ReplyIcon />
          </div>
          <div className='postBtn'>
            <Loop />
          </div>
          <div className='postBtn'>
            <StarIcon />
          </div>
          <div className='postBtn'>
            <DotsHorizontalIcon />
          </div>
        </div>
      </div>
    )
  }
)

export default Post
