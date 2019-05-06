// Simple React Native specific changes

const ENV = 'DEV' | 'STAGE'
const env: ENV = 'STAGE'

const configDev = {
  apiKey: 'AIzaSyD6eADZofvvncbTswItjCrD6rDSQJkJALI',
  authDomain: 'trackingsystemdemo.firebaseapp.com',
  databaseURL: 'https://walturndemo.firebaseio.com',
  projectId: 'trackingsystemdemo',
  storageBucket: 'trackingsystemdemo.appspot.com',
  messagingSenderId: '58044608671'
}
const configStage = {
  apiKey: 'AIzaSyAWPj3utAJpUi6OpE6VBg-y7ehIIYMCGzc',
  authDomain: 'trackingsystemdev.firebaseapp.com',
  databaseURL: 'https://walturndemo.firebaseio.com',
  projectId: 'trackingsystemdev',
  storageBucket: 'trackingsystemdev.appspot.com',
  messagingSenderId: '646811538781'
}

const baseUrl = `http://${env === 'DEV' ? 'gbsc-erp' : 'evasalesforcestage'}.azurewebsites.net/`
const firebaseConfig = env === 'DEV' ? configDev : configStage

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  env,
  baseUrl,
  firebaseConfig,
  GOOGLE_API: 'AIzaSyBrb2XMt6F8A37iCwSDUbsTj3P1GNYJmD4'
}
