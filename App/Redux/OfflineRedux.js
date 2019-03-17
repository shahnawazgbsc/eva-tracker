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
  addCheckOut: ['time'],
  removeCheckIn: ['id'],
  fixStore: ['prevId', 'newId', 'userId'],
  syncStores: null,
  syncCheckIns: null
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
export const addPjpStore = (state, { data }) => Immutable(state).merge({ pjpShops: R.append(data, state.pjpShops) })

export const addOtherStore = (state, { data }) => Immutable(state).merge({ otherShops: R.append(data, state.otherShops) })

export const addCheckIns = (state, { data }) => Immutable(state).merge({ checkIns: R.append(data, state.checkIns) })

export const addCheckOut = (state, { time }) => Immutable(state).merge({
  checkIns: R.update(state.checkIns.length - 1, R.assoc('EndTime', time, state.checkIns[state.checkIns.length - 1]), state.checkIns)
})

export const addInventory = (state, { data }) => Immutable(state).merge({
  checkIns: R.update(state.checkIns.length - 1, R.assoc('inventory', data, state.checkIns[state.checkIns.length - 1]), state.checkIns)
})

export const addOrder = (state, { data }) => Immutable(state).merge({
  checkIns: R.update(state.checkIns.length - 1, R.assoc('order', data, state.checkIns[state.checkIns.length - 1]), state.checkIns)
})

export const removeCheckIn = (state, { id }) => {
  const index = R.findIndex(R.propEq('storeVisitId', id), state.checkIns)

  return Immutable(state).merge({
    checkIns: index !== -1 ? R.remove(index, 1, state.checkIns) : state.checkIns
  })
}

export const fixStore = (state, { prevId, newId }) => {
  const index = R.findIndex(R.propEq('StoreId', prevId), state.checkIns)
  const pjpIndex = R.findIndex(R.pathEq(['data', 'storeId'], prevId))(state.pjpShops)
  const otherIndex = R.findIndex(R.pathEq(['data', 'storeId'], prevId))(state.otherShops)

  return Immutable(state).merge({
    checkIns: index !== -1 ? R.update(index, R.assoc('StoreId', newId, state.checkIns[index]), state.checkIns) : state.checkIns,
    pjpShops: pjpIndex !== -1 ? R.remove(pjpIndex, 1, state.pjpShops) : state.pjpShops,
    otherShops: otherIndex !== -1 ? R.remove(otherIndex, 1, state.otherShops) : state.otherShops
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PJP_STORE]: addPjpStore,
  [Types.ADD_OTHER_STORE]: addOtherStore,
  [Types.ADD_CHECK_INS]: addCheckIns,
  [Types.ADD_CHECK_OUT]: addCheckOut,
  [Types.ADD_ORDER]: addOrder,
  [Types.ADD_INVENTORY]: addInventory,
  [Types.FIX_STORE]: fixStore,
  [Types.REMOVE_CHECK_IN]: removeCheckIn
})
