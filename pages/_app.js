//front-end
import '../styles/globals.css'
import Login from './login'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
//back-end
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, store } from '../firebase'
import firebase from 'firebase'

function MyApp ({ Component, pageProps }) {
  const [user] = useAuthState(auth)

  const progress = new ProgressBar({
    size: 4,
    color: '#F0F8FF',
    className: 'z-5D',
    delay: 100
  })

  useEffect(() => {
    if (user) {
      store
        .collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            displayName: user.displayName,
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL
          },
          { merge: true }
        )
    }
  }, [user])

  Router.events.on('routeChangeStart', progress.start)
  Router.events.on('routeChangeComplete', progress.finish)
  Router.events.on('routeChangeError', progress.finish)

  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
