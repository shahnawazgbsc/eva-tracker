import * as firebase from 'firebase'
import 'firebase/firestore'

const settings = { timestampsInSnapshots: true }

const config = {
  apiKey: 'AIzaSyD6eADZofvvncbTswItjCrD6rDSQJkJALI',
  authDomain: 'trackingsystemdemo.firebaseapp.com',
  databaseURL: 'https://walturndemo.firebaseio.com',
  projectId: 'trackingsystemdemo',
  storageBucket: 'trackingsystemdemo.appspot.com',
  messagingSenderId: '58044608671'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.firestore().settings(settings)
}

export default firebase
