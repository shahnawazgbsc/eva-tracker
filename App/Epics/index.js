import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { createStoreEpic, storeById } from './StoreEpics'
import { checkInEpic, checkOutEpic, placeOrderEpics,nonProductiveReasonsEpics } from './OrderTakingEpics'
import { directionsEpic } from './MapsEpics'
import GpsUpdateEpic from './GpsUpdateEpic'
import { selectProductsListEpics,selectInventorySKUs } from './InventoryTakingEpics'
import { dayEndEpic, dayStartEpic } from './DayEpics'
import HistoryEpics from './HistoryEpics'
import ShopHistoryEpics from './shopHistoryEpics'

export default combineEpics(
  LoginEpics,
  storeById,
  createStoreEpic,
  checkInEpic,
  checkOutEpic,
  placeOrderEpics,
  directionsEpic,
  GpsUpdateEpic,
  HistoryEpics,
  selectProductsListEpics,
  selectInventorySKUs,
  dayStartEpic,
  dayEndEpic,
  nonProductiveReasonsEpics,
  ShopHistoryEpics
)
