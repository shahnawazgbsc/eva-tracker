import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createStoreRequest: ['data'],
  createStoreSuccess: ['payload'],
  subSectionSuccess: ['payload'],
  selectDays: ['payload'],
  selectItems: ['payload'],
  selectProductsList: ['payload'],
  selectShopName: null,
  selectShopAddress: null,
  selectShopNumber: null,
  resetDays: null,
  createStoreFailure: null
})

export const CreateStoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  subSection: null,
  days: null,
  fetching: null,
  payload: null,
  error: null,
  items:null,
  productsList:null,
  shopName:null,
  shopAddress:null,
  shopNumber:null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

export const subSectionSuccess = (state, { payload }) => state.merge({ subSection: payload })

export const selectDays = (state, { payload }) => state.merge({ days: payload })

export const resetDays = (state) => state.merge({ days: null })

export const selectItems = (state, { payload }) => state.merge({ items: payload })

export const selectProductsList = (state, { payload }) => state.merge({ productsList: payload })

export const selectShopAddress = (state, { payload }) => state.merge({ shopAddress: payload })

export const selectShopName = (state, { payload }) => state.merge({ shopName: payload })

export const selectShopNumber = (state, { payload }) => state.merge({ shopNumber: payload })

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_STORE_REQUEST]: request,
  [Types.CREATE_STORE_SUCCESS]: success,
  [Types.CREATE_STORE_FAILURE]: failure,
  [Types.SUB_SECTION_SUCCESS]: subSectionSuccess,
  [Types.RESET_DAYS]: resetDays,
  [Types.SELECT_DAYS]: selectDays,
  [Types.SELECT_ITEMS]: selectItems,
  [Types.SELECT_PRODUCTS_LIST]: selectProductsList,
  [Types.SELECT_SHOP_ADDRESS]: selectShopAddress,
  [Types.SELECT_SHOP_NAME]: selectShopName,
  [Types.SELECT_SHOP_NUMBER]: selectShopNumber
})
