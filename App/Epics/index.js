import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { createStoreEpic, storeById } from './StoreEpics'

export default combineEpics(
  LoginEpics,
  storeById,
  createStoreEpic
)
