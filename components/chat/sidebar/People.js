//front-end
//back-end
import { auth, store } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import getReceiver from '../../../utilities/getReceiver'
import { useRouter } from 'next/router'

function People ({ id, users }) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [receiverSnapshot] = useCollection(
    store.collection('users').where('email', '==', getReceiver(users, user))
  )

  const headToChat = () => {
    router.push(`/chats/${id}`)
  }

  const receiver = getReceiver(users, user)
  const receiverPhoto = receiverSnapshot?.docs?.[0]?.data()

  return (
    <div
      onClick={headToChat}
      className='
        grid
        place-items-center
        space-x-3
        border-t-2
        border-b-2
        border-blue-300
        p-4
        break-words
        cursor-pointer
        bg-gray-800
        hover:bg-gray-700
        '
    >
      {receiver ? (
        <img
          src={receiverPhoto?.photoURL}
          className='rounded-full'
          height={50}
          width={50}
        />
      ) : (
        <img className='rounded-full' height={50} width={50}>
          {receiver[0]}
        </img>
      )}
      <h2 className='font-bold text-blue-300'>{receiverPhoto?.displayName}</h2>
      <h3 className='font-semibold text-blue-500'>{receiver}</h3>
    </div>
  )
}

export default People
