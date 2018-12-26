import * as firebase from 'firebase'
import 'firebase/firestore'

const settings = { timestampsInSnapshots: true }

const config = {
  apiKey: 'AIzaSyD6eADZofvvncbTswItjCrD6rDSQJkJALI',
  authDomain: 'trackingsystemdemo.firebaseapp.com',
  databaseURL: 'https://walturndemo.firebaseio.com',
  projectId: 'trackingsystemdemo',
  storageBucket: 'trackingsystemdemo.appspot.com',
  messagingSenderId: '494586801404'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.firestore().settings(settings)
}

export default firebase
