//front-end
import Message from './Message'
import TimeAgo from 'timeago-react'
import { Avatar } from '@material-ui/core'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { ExitToAppOutlined, PanoramaOutlined } from '@material-ui/icons'
import styled from 'styled-components'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getReceiver from '../../../utilities/getReceiver'
import { auth, store } from '../../../firebase'
import { useState, useRef } from 'react'
import firebase from 'firebase'
import { useRouter } from 'next/router'

function Feed ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfFeedRef = useRef(null)
  const pickImgRef = useRef(null)
  const [pickedImage, setPickedImage] = useState(null)
  const router = useRouter()
  const [receiverSnapshot] = useCollection(
    store
      .collection('users')
      .where('email', '==', getReceiver(chat.users, user))
  )

  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const receiverEmail = getReceiver(chat.users, user)

  const sendJPG = e => {
    const reader = new FileReader()
    if (e.target.value[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = readerEvent => {
      setPickedImage(readerEvent.target.result)
    }
  }

  const removeJPG = () => {
    setPickedImage(null)
  }

  const [messageSnapshot] = useCollection(
    store
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const scrollDown = () => {
    endOfFeedRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const sendChat = e => {
    e.preventDefault()

    store
      .collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )

    store
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })
    setInput('')
    scrollDown()
  }

  const showChat = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message
              .data()
              .timestamp?.toDate()
              .getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  return (
    <div>
      <div
        className='
      h-[54px]
      top-0
      z-50
      md:h-20
      p-3
      sticky
      flex
      items-center
      space-x-4
      border-b-2
      border-blue-300
      '
      >
        <div className='flex items-center space-x-3 ml-3 flex-grow'>
          <ChevronLeftIcon
            onClick={() => router.push('/chat')}
            className='inline-flex h-10 cursor-pointer text-blue-300 md:hidden'
          />
          {receiver ? (
            <Avatar src={receiver?.photoURL} />
          ) : (
            <Avatar>{receiverEmail[0]}</Avatar>
          )}
          <div className='items-center'>
            <h2 className='font-bold text-blue-300'>{receiver?.displayName}</h2>
            <h3 className='hidden xl:inline-flex font-semibold text-blue-500'>
              {receiverEmail}
            </h3>
          </div>
        </div>
        {receiverSnapshot ? (
          <h2 className='text-blue-400 text-lg font-semibold mr-3'>
            Last seen:...{' '}
            {receiver?.lastSeen?.toDate() ? (
              <TimeAgo datetime={receiver?.lastSeen?.toDate()} />
            ) : (
              'Unknown'
            )}
          </h2>
        ) : (
          <h2 className='text-blue-400 text-lg font-semibold mr-3'>
            Loading last seen...
          </h2>
        )}
      </div>
      <div className='min-h-[90vh]'>
        {showChat()}
        <ChatEnd ref={endOfFeedRef} />
      </div>
      <form
        className='
      bottom-0
      bg-gray-800
      sticky
      flex
      space-x-4
      border-t-2
      border-blue-300
      '
      >
        <div
          className='
        flex-grow
        mt-2
        space-x-3
        flex
        items-center
        ml-2
        mr-2
        h-8
        '
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type='text'
            placeholder='What do you want to say, user ?'
            className='chatInput'
          />
          <button hidden disabled={!input} onClick={sendChat} type='submit'>
            Send message
          </button>
          <div
            className='
          flex 
          items-center
          space-x-4
          '
          >
            <SendBtn
              disabled={!input}
              onClick={sendChat}
              className='
          text-blue-400
          hover:text-blue-300
          active:text-gray-200
          cursor-pointer
          mr-2
          '
            />
            <SendPic
              className='
          text-blue-400
          hover:text-blue-300
          active:text-gray-200
          cursor-pointer
          mr-3
          '
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Feed

const ChatArea = styled.div`
  min-height: 90vh;
`

const ChatEnd = styled.div`
  margin-bottom: 30px;
`

const SendBtn = styled(ExitToAppOutlined)`
  &&& {
    height: 30px;
    width: 30px;
  }
`
const SendPic = styled(PanoramaOutlined)`
  &&& {
    height: 30px;
    width: 30px;
  }
`
