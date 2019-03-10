import Store from './Store';
import Order from './Order';
import Inventory from './Inventory'
import StoreVisits from './StoreVisits'
import InventoryItems from './InventoryItems'
import Brands from './Brands'
import GeneralSkus from './GeneralSkus'
import CheckIn from './CheckIn'
import NonProductiveReasons from './NonProductiveReasons'
import NoOrderReason from './NoOrderReason'

export const Schema = [NoOrderReason,NonProductiveReasons,InventoryItems,Brands,Store,Order,Inventory,StoreVisits,GeneralSkus,CheckIn];

export const SchemaVersion = 1;