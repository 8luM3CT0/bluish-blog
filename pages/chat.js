//front-end
import ChatList from '../components/chat/sidebar/ChatList'
import Welcome from '../components/chat/welcome/Welcome'
//back-end

function Chat () {
  return (
    <div className='flex bg-gray-900 h-screen overflow-hidden'>
      {/**ChatSidebar */}
      <ChatList />
      {/**ChatWelcome */}
      <Welcome />
    </div>
  )
}

export default Chat
