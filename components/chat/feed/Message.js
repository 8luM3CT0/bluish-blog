//front-end
import moment from 'moment'
import styled from 'styled-components'
//back-end
import { auth } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Message ({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Receiver

  return (
    <div>
      <TypeOfMessage>
        <h3
          className='
          mr-3
          text-md 
          font-bold
          text-blue-400
          w-20
          break-words
          truncate
          underline
          '
        >
          {message.displayName}
        </h3>
        {message.message}
        <span
          className='
                text-blue-600
                mt-4
                p-3
                text-sm
                absolute
                bottom-0
                right-0
                text-right
                '
        >
          {message.timestamp ? moment(message.timestamp).format('LT') : '....'}
        </span>
      </TypeOfMessage>
    </div>
  )
}

export default Message

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  min-width: 70px;
  min-height: 90px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #111e29;
  color: aliceblue;
`

const Receiver = styled(MessageElement)`
  background-color: aliceblue;
  color: #111e29;
  text-align: left;
`
