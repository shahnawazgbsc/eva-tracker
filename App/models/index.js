import Store from './Store';
import Order from './Order';
import Inventory from './Inventory'
import StoreVisits from './StoreVisits'
import InventoryItems from './InventoryItems'
import Brands from './Brands'
import GeneralSkus from './GeneralSkus'

export const Schema = [InventoryItems,Brands,Store,Order,Inventory,StoreVisits,GeneralSkus];

export const SchemaVersion = 1;