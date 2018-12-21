import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { storeById } from './StoreEpics'

export default combineEpics(
  LoginEpics,
  storeById
)
