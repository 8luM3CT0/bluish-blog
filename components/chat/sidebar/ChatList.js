//front-end
import { UserAddIcon } from '@heroicons/react/outline'
import { IconButton } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import styled from 'styled-components'
import People from './People'
//back-end
import { useRouter } from 'next/router'
import { auth, store } from '../../../firebase-file/firebaseFile'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import * as UserValidator from 'email-validator'

function ChatList () {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const userChatRef = store
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)

  const userExists = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const addUser = () => {
    const input = prompt(
      'Enter the email address of the user you wanna chat with: '
    )

    if (!input) return null

    if (
      input !== user.email &&
      !userExists(input) &&
      UserValidator.validate(input)
    ) {
      store.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <div
      className='
        flex-1
        flex
        flex-col
        xl:max-w-[460px]
        xl:min-w-[370px]
        h-screen
        bg-gray-800
        border-r-2
        border-gray-400
        '
    >
      {/**List header */}
      <div className='listHeader'>
        <BackBtn onClick={goHome}>
          <ArrowBackIos />
        </BackBtn>
        <img
          src={user?.photoURL}
          alt='user-pic'
          height={60}
          width={60}
          objectFit='contain'
          className='
          rounded-xl 
          border-2 
          border-gray-700 
          cursor-pointer'
        />
        <div className='flex-col '>
          <h3
            className='
          text-blue-300 
          font-bold 
          text-lg'
          >
            {user?.displayName}
          </h3>
          <h4
            className='
          text-blue-500 
          font-semibold 
          text-sm'
          >
            {user?.email}
          </h4>
        </div>
      </div>
      {/**User list */}
      <UserList className='bg-800'>
        {/**map
         * the
         * fucking
         * users
         * here,
         * dipshit
         */}
        {chatSnapshot?.docs.map(chat => (
          <People key={chat.key} id={chat.id} users={chat.data().users} />
        ))}
      </UserList>
      {/**User details */}
      <div className='listFooter'>
        <UserAddIcon
          onClick={addUser}
          className='
        h-10
        text-blue-300
        cursor-pointer
        active:text-blue-100
        '
        />
        <h3
          className='
        text-blue-300 
        font-semibold 
        text-lg'
        >
          Add a user
        </h3>
      </div>
    </div>
  )
}

export default ChatList

const UserList = styled.div`
  min-height: 90vh;
`
const BackBtn = styled(IconButton)`
  &&& {
    --tw-bg-opacity: 1;
    background-color: rgba(75, 85, 99, var(--tw-bg-opacity));
    --tw-border-opacity: 1;
    color: rgba(147, 197, 253, var(--tw-border-opacity));
  }
`
