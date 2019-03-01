import Store from './Store';
import Order from './Order';
import Inventory from './Inventory'
import StoreVisits from './StoreVisits'
import InventoryItems from './InventoryItems'
import Brands from './Brands'

export const Schema = [InventoryItems,Brands,Store,Order,Inventory,StoreVisits];

export const SchemaVersion = 1;