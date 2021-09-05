//front-end
import Head from 'next/head'
import { UserGroupIcon } from '@heroicons/react/outline'
import { EmojiEmotions, Web } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
//back-end
import { auth, provider } from '../firebase'

function Login () {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <Head>
        <title>The-login-page</title>
      </Head>
      <div
        className='
      grid 
      flex-1 
      place-items-center 
      bg-login-bg 
      bg-cover'
      >
        <div className='items-center grid'>
          <UserGroupIcon className='h-44 text-blue-200' />
        </div>
      </div>
      <div
        className='
      grid
      flex-1
      place-items-center
      bg-gray-900
      '
      >
        <div className='items-center grid bg-gray-700 p-24 rounded-xl'>
          <div className='grid items-center text-center mb-4'>
            <h2 className='loginText animate-bounce underline'>
              Hello! <EmojiEmotions className='text-gray-100 ml-3 h-28' />
            </h2>
            <h2 className='loginText'>To start, please sign in</h2>
          </div>
          <LoginBtn onClick={signIn}>
            <h1 className='text-xl hover:animate-pulse'>Sign in</h1>
          </LoginBtn>
        </div>
      </div>
    </div>
  )
}

export default Login

const LoginBtn = styled(Button)`
  &&& {
    height: 50px;
    width: 170px;
    color: lightblue;
    background-color: #54687c;
    border: 2px solid lightblue;
    text-transform: capitalize;
    :hover {
      background-color: #87a7c7;
      color: #54687c;
    }
  }
`
