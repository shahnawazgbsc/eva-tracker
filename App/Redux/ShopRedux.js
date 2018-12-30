import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  checkInRequest: ['data'],
  checkInSuccess: ['data'],
  checkOutRequest: ['data'],
  checkOutSuccess: ['data'],
  addToCart: ['data'],
  removeItem: ['item'],
  placeOrderRequest: ['data'],
  placeOrderSuccess: null,
  shopFailure: ['error']
})

export const ShopTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  checkedIn: false,
  shop: null,
  checkInParam: null,
  fetching: null,
  orderItems: [],
  orderPlaced: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const checkIn = (state, { data }) =>
  Immutable(state).merge({ fetching: true, shop: data })

export const checkOut = (state) => Immutable(state).merge({ fetching: true })

export const removeItem = (state, { item }) => {
  const items = Immutable(state.orderItems).asMutable()
  const filtered = items.filter(value => value.inventoryItemId !== item.inventoryItemId)
  return Immutable(state).set('orderItems', Immutable(filtered))
}

export const addToCart = (state, { data }) => Immutable(state).set('orderItems', Immutable(state.orderItems).concat(data))

export const checkInSuccess = (state, { data }) => Immutable(state).merge({
  fetching: false,
  checkInParam: data,
  orderItems: [],
  orderPlaced: false,
  checkedIn: true
})

export const placeOrderRequest = (state) => Immutable(state).merge({ fetching: true })

export const placeOrderSuccess = (state) => Immutable(state).merge({
  fetching: false,
  orderPlaced: true,
  orderItems: []
})

export const checkOutSuccess = (state) => INITIAL_STATE

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  Immutable(state).merge({ fetching: false, error })

export const startUp = (state) => Immutable(state).merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_IN_REQUEST]: checkIn,
  [Types.CHECK_OUT_REQUEST]: checkOut,
  [Types.CHECK_IN_SUCCESS]: checkInSuccess,
  [Types.CHECK_OUT_SUCCESS]: checkOutSuccess,
  [Types.PLACE_ORDER_SUCCESS]: placeOrderSuccess,
  [Types.PLACE_ORDER_REQUEST]: placeOrderRequest,
  [Types.ADD_TO_CART]: addToCart,
  [Types.SHOP_FAILURE]: failure,
  [Types.REMOVE_ITEM]: removeItem,
  'STARTUP': startUp
})
