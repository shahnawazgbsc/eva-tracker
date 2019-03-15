import { combineEpics } from 'redux-observable'
import LoginEpics from './LoginEpics'
import { createStoreEpic, storeById } from './StoreEpics'
import { checkInEpic, checkOutEpic, nonProductiveReasonsEpics, placeOrderEpics } from './OrderTakingEpics'
import { directionsEpic } from './MapsEpics'
import GpsUpdateEpic from './GpsUpdateEpic'
import { selectInventorySKUs, selectProductsListEpics } from './InventoryTakingEpics'
import { dayEndEpic, dayStartEpic } from './DayEpics'
import ShopHistoryEpics from './ShopHistoryEpics'
import { appEpic, processStores } from './AppEpics'

export default combineEpics(
  LoginEpics,
  storeById,
  createStoreEpic,
  checkInEpic,
  checkOutEpic,
  placeOrderEpics,
  directionsEpic,
  GpsUpdateEpic,
  appEpic,
  selectProductsListEpics,
  selectInventorySKUs,
  dayStartEpic,
  dayEndEpic,
  nonProductiveReasonsEpics,
  ShopHistoryEpics,
  processStores,
)
