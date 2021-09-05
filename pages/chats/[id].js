//front-end
import Head from 'next/head'
import ChatList from '../../components/chat/sidebar/ChatList'
import ChatFeed from '../../components/chat/feed/ChatFeed'
//back-end
import { auth, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getReceiver from '../../utilities/getReceiver'
import firebase from 'firebase'

function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <div
      className='
        overflow-hidden 
        flex 
        bg-gray-800'
    >
      <Head>
        <title>Chat with the other user</title>
      </Head>
      <div className='hidden md:inline-flex'>
        <ChatList />
      </div>
      <div
        className='
            flex-1 
            overflow-scroll 
            scrollbar-hide'
      >
        {/**
         * ChatFeed here
         * */}
        <ChatFeed chat={chat} messages={messages} />
      </div>
    </div>
  )
}

export default Chat

export async function getServerSideProps (context) {
  const ref = store.collection('chats').doc(context.query.id)

  const chatMessages = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = chatMessages.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  const chatPart = await ref.get()
  const chat = {
    id: chatPart.id,
    ...chatPart.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}
