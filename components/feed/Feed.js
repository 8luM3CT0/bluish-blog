//front-end
import { HomeIcon } from '@heroicons/react/outline'
import Post from './post/Post'
import PostBox from '../sidebar/post-box/PostBox'
//back-end
import { useEffect, useState } from 'react'
import { store } from '../../firebase-file/firebaseFile'

function Feed () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    store
      .collection('posts')
      .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => doc.data())))
  }, [])

  return (
    <div className='feedDiv'>
      {/**
       *
       * Feed parts
       */}
      <div
        className='
      top-0
      z-50 
      sticky 
      flex 
      bg-gray-600 
      items-center 
      justify-between
      px-6
      py-3
      '
      >
        <h2 className='text-xl text-gray-300 font-semibold'>Home</h2>
        <HomeIcon className='text-gray-300 h-10' />
      </div>
      <div className='md:hidden mt-4'>
        <PostBox />
      </div>
      <div className='overflow-y-scroll scrollbar-hide flex-1'>
        {posts.map(post => (
          <Post
            key={post.post}
            name={post.name}
            email={post.email}
            photoURL={post.photoURL}
            post={post.post}
            timestamp={post.timestamp}
            postImage={post.postImage}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
