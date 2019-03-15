import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addPjpStore: ['data'],
  addOtherStore: ['data'],
  addCheckIns: ['data'],
  addInventory: ['data'],
  addOrder: ['data'],
  fixStore: ['prevId', 'newId'],
  syncWithServer: null
})

export const OfflineTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pjpShops: [],
  otherShops: [],
  checkIns: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const addPjpStore = (state, { data }) => Immutable(state).merge({ pjpShops: Immutable(state).pjpShops.concat(data) })

export const addOtherStore = (state, { data }) => Immutable(state).merge({ otherShops: Immutable(state).otherShops.concat(data) })

export const addCheckIns = (state, { data }) => Immutable(state).merge({ checkIns: Immutable(state).checkIns.concat(data) })

export const addInventory = (state, { data }) => Immutable(state).merge({
  checkIns: R.set(R.lensProp(`${state.checkIns.length - 1}`), R.assoc('inventory', data, state.checkIns[state.checkIns.length - 1]), state.checkIns)
})

export const fixStore = (state, { prevId, newId }) => {
  const index = R.findIndex(R.propEq('StoreId', prevId), state.checkIns)
  return Immutable(state).merge({
    checkIns: index !== -1 ? R.over(R.lensIndex(index), R.assoc('StoreId', newId), state.checkIns)
      : state.checkIns
  })
}

export const addOrder = (state, { data }) => Immutable(state).merge({
  checkIns: R.set(R.lensProp(`${state.checkIns.length - 1}`), R.assoc('order', data, state.checkIns[state.checkIns.length - 1]), state.checkIns)
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PJP_STORE]: addPjpStore,
  [Types.ADD_OTHER_STORE]: addOtherStore,
  [Types.ADD_CHECK_INS]: addCheckIns,
  [Types.ADD_ORDER]: addOrder,
  [Types.ADD_INVENTORY]: addInventory,
  [Types.FIX_STORE]: fixStore
})
