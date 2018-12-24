import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  checkInRequest: ['data'],
  checkInSuccess: ['data'],
  checkOutRequest: ['data'],
  checkOutSuccess: null,
  addToCart: ['data'],
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
  state.merge({ fetching: true, shop: data })

export const checkOut = (state) => state.merge({ fetching: true })

export const addToCart = (state, { data }) => state.set('orderItems', state.orderItems.concat(data))

export const checkInSuccess = (state, { data }) => state.merge({
  fetching: false,
  checkInParam: data,
  orderItems: [],
  orderPlaced: false,
  checkedIn: true
})

export const placeOrderRequest = (state) => state.merge({ fetching: true })

export const placeOrderSuccess = (state) => state.merge({ fetching: false, orderPlaced: true, orderItems: [] })

export const checkOutSuccess = (state) => INITIAL_STATE

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_IN_REQUEST]: checkIn,
  [Types.CHECK_OUT_REQUEST]: checkOut,
  [Types.CHECK_IN_SUCCESS]: checkInSuccess,
  [Types.CHECK_OUT_SUCCESS]: checkOutSuccess,
  [Types.PLACE_ORDER_SUCCESS]: placeOrderSuccess,
  [Types.PLACE_ORDER_REQUEST]: placeOrderRequest,
  [Types.ADD_TO_CART]: addToCart,
  [Types.SHOP_FAILURE]: failure
})
