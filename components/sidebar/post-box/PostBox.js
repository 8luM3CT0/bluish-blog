//front-end
import {
  PaperClipIcon,
  MenuAlt1Icon,
  GlobeIcon,
  DocumentReportIcon
} from '@heroicons/react/outline'
//back-end
import { auth, store, storage } from '../../../firebase-file/firebaseFile'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRef, useState } from 'react'
import firebase from 'firebase'

function PostBox () {
  const [user] = useAuthState(auth)
  const inputRef = useRef(null)
  const filepickerRef = useRef(null)
  const [imagePost, setImagePost] = useState(null)

  const addImage = e => {
    const reader = new FileReader()
    if (e.target.value[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = readerEvent => {
      setImagePost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImagePost(null)
  }

  const postStuff = e => {
    e.preventDefault()

    if (!inputRef.current.value) return

    store
      .collection('posts')
      .add({
        post: inputRef.current.value,
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => {
        if (imagePost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imagePost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_change',
            null,
            error => console.error(error),
            () => {
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then(url => {
                  store
                    .collection('posts')
                    .doc(doc.id)
                    .set(
                      {
                        postImage: url
                      },
                      { merge: true }
                    )
                })
            }
          )
        }
      })
    inputRef.current.value = ' '
  }

  return (
    <div
      className='
        shadow-md
        text-gray-800
        bg-gray-50
        font-medium
        rounded-md
        justify-between
        '
    >
      {/**PostBoxTop */}
      <div
        className='
        flex
        space-x-3
        items-center
        p-10
        '
      >
        <form
          className='
            flex
            flex-1
            '
        >
          <input
            ref={inputRef}
            placeholder="What's on your mind ?"
            type='text'
            className='
            placeholder-transparent 
            xl:placeholder-gray-200 
            flex-shrink-0
            xl:flex-grow 
            rounded-full 
            h-12 
            bg-transparent 
            px-2 
            outline-none'
          />
          <button hidden onClick={postStuff} type='submit'>
            Post status
          </button>
        </form>
        {imagePost && (
          <div onClick={removeImage} className='removeImage'>
            <img src={imagePost} className='h-10 object-contain' alt='' />
            <p className='text-xs text-red-300 text-center'>Remove image ?</p>
          </div>
        )}
      </div>
      {/**PostBoxBottom */}
      <div
        className='
        flex
        flex-grow
        justify-between
        mt-3
        p-3
        items-center
        bg-gray-200
        '
      >
        <div className='flex space-x-4 items-center '>
          <PaperClipIcon
            className='postPhoto'
            onClick={() => filepickerRef.current.click()}
          />
          <input hidden type='file' ref={filepickerRef} onChange={addImage} />
          <MenuAlt1Icon className='postIcon' />
          <GlobeIcon className='postIcon' />
          <DocumentReportIcon className='postIcon' />
        </div>
        <button
          className='
        w-16
        h-9
        bg-gray-600
        text-blue-100
        rounded-md
        font-semibold
        active:bg-blue-300
        active:text-gray-600
        '
          onClick={postStuff}
          type='submit'
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default PostBox
