import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAhooInavR6EXSRRUZupCAaaNEo8SvTWIQ',
    authDomain: 'music-776b2.firebaseapp.com',
    projectId: 'music-776b2',
    storageBucket: 'music-776b2.appspot.com',
    messagingSenderId: '769604820198',
    appId: '1:769604820198:web:ef46e27c5c7f43263cef27'
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // إذا كانت Firebase مهيأة مسبقًا
}

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
