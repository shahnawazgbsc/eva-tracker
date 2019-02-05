import * as firebase from 'firebase'
import 'firebase/firestore'
import AppConfig from '../Config/AppConfig'

const settings = {}

if (!firebase.apps.length) {
  firebase.initializeApp(AppConfig.firebaseConfig)
  firebase.firestore().settings(settings)
}

export default firebase
