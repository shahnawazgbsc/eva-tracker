import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { createStoreEpic, storeById } from './StoreEpics'
import { checkInEpic, checkOutEpic, placeOrderEpics } from './OrderTakingEpics'
import { directionsEpic } from './MapsEpics'
import GpsUpdateEpic from './GpsUpdateEpic'

export default combineEpics(
  LoginEpics,
  storeById,
  createStoreEpic,
  checkInEpic,
  checkOutEpic,
  placeOrderEpics,
  directionsEpic,
  GpsUpdateEpic
)
