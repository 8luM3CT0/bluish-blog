import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAasBCmIyZBBeMdx3okxRp-ZN0bgWgaWb0',
  authDomain: 'tweet-cpart.firebaseapp.com',
  projectId: 'tweet-cpart',
  storageBucket: 'tweet-cpart.appspot.com',
  messagingSenderId: '1032201932299',
  appId: '1:1032201932299:web:fbc20c17e0d90b6e0c810e',
  measurementId: 'G-M4BE99KNTJ'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const store = app.firestore()
const storage = app.storage()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, store, storage }
