import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  shopHistoryRequest: ['data'],
  shopHistorySuccess: ['payload'],
  shopHistoryFailure: ['error']
})

export const ShopHistoryTakingType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})
/* ------------- Reducers ------------- */

// request the data from an api

export const request = (state, { data }) => Immutable(state).merge({ fetching: true, data, payload: null })

// export const success = (state, {data}) =>  Immutable(state).merge({
//    fetching: false, data:data , error: null})

export const success = (state, { payload }) => Immutable(state).merge({
  fetching: false, error: null, data: payload
})

// Something went wrong somewhere.
export const failure = (state, { error }) => Immutable(state).merge({ fetching: false, error })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOP_HISTORY_REQUEST]: request,
  [Types.SHOP_HISTORY_SUCCESS]: success,
  [Types.SHOP_HISTORY_FAILURE]: failure
})
