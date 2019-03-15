import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {
  Types,
  Creators
} = createActions({
  inventoryRequest: ['data'],
  inventoryFailure: ['error'],
  inventorySuccess: ['data'],
  inventory_sku_request: null,
  inventory_sku_success: ['data'],
  inventory_sku_failure: ['error']
})

export const InventoryTakingType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  inventorySKUs: []
})

/* ------------- Reducers ------------- */

// request the data from an api

export const request = (state, {
  data
}) => Immutable(state).merge({
  fetching: true
})

export const success = (state, {
  data
}) => Immutable(state).merge({
  fetching: false,
  error: null
})

// Something went wrong somewhere.
export const failure = (state, {
  error
}) => Immutable(state).merge({
  fetching: false,
  error
})

export const inventory_sku_request = (state) => Immutable(state).merge({ fetching: true })
export const inventory_sku_success = (state, { data }) => Immutable(state).merge({
  fetching: false,
  error: null,
  inventorySKUs: data
})
export const inventory_sku_failure = (state, {
  error
}) => Immutable(state).merge({
  fetching: false,
  error,
})
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INVENTORY_REQUEST]: request,
  [Types.INVENTORY_SUCCESS]: success,
  [Types.INVENTORY_FAILURE]: failure,
  [Types.INVENTORY_SKU_REQUEST]: inventory_sku_request,
  [Types.INVENTORY_SKU_SUCCESS]: inventory_sku_success,
  [Types.INVENTORY_SKU_FAILURE]: inventory_sku_failure
})
