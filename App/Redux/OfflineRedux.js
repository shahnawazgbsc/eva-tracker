import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addPjpStore: ['data'],
  addOtherStore: ['data']
})

export const OfflineTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pjpShops: [],
  otherShops: [],
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const addPjpStore = (state, { data }) => Immutable(state).pjpShops.concat(data)

export const addOtherStore = (state, { data }) => Immutable(state).otherShops.concat(data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PJP_STORE]: addPjpStore,
  [Types.ADD_OTHER_STORE]: addOtherStore
})
