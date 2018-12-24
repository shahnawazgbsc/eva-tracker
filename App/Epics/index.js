import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { createStoreEpic, storeById } from './StoreEpics'
import { placeOrderEpics, checkInEpic, checkOutEpic } from './OrderTakingEpics'
import { directionsEpic } from './MapsEpics'

export default combineEpics(
  LoginEpics,
  storeById,
  createStoreEpic,
  checkInEpic,
  checkOutEpic,
  placeOrderEpics,
  directionsEpic
)
