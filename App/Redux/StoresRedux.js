import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ShopTypes } from './ShopRedux'
import * as R from 'ramda'
import moment from 'moment'
import GetVisitDay from '../Lib/GetVisitDay'
import AppConfig from '../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storesSuccess: ['payload'],
  storesRequest: null,
  storesFailure: ['error'],
  dayStartRequest: ['data', 'userid'],
  dayStartSuccess: ['id', 'userid'],
  dayEndRequest: ['note'],
  dayEndSuccess: ['userid'],
  reset: null
})

export const StoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
  pjpShops: null,
  others: null,
  achieved: {},
  fetching: false,
  dayStarted: {},
  dayStartDate: {},
  pjpId: {},
  subsection: {}
})

/* ------------- Reducers ------------- */

// successful api lookup
const request = (state = INITIAL_STATE) => Immutable(state).merge({ fetching: true })

const dayStartRequest = (state, { data, userid }) => Immutable(state).merge({
  fetching: true,
  subsection: R.assoc(userid, data, state.subsection)
})

const dayStartSuccess = (state, { id, userid }) => Immutable(state).merge({
  fetching: false,
  pjpId: R.assoc(userid, id, state.pjpId),
  dayStarted: R.assoc(userid, true, state.dayStarted),
  dayStartDate: R.assoc(userid, moment().format("MM/DD/YYYY HH:mm"), state.dayStartDate)
})

const dayEndRequest = (state) => Immutable(state).merge({ fetching: true })

const dayEndSuccess = (state, { userid }) => Immutable(state).merge({
  fetching: false,
  pjpId: R.assoc(userid, null, state.pjpId),
  subsection: R.assoc(userid, null, state.subsection),
  dayStarted: R.assoc(userid, false, state.dayStarted),
  achieved: R.assoc(userid, [], state.achieved)
})

export const success = (state, { payload }) => {
  let pjpShops =
    R.map(R.assoc('pjp', true))(
      R.filter(
        R.compose(
          R.contains(GetVisitDay()),
          R.map(R.prop('day')),
          R.prop('visitDays')
        ))(payload))

  let others = R.filter(
    R.compose(
      R.not,
      R.contains(GetVisitDay()),
      R.map(R.prop('day')),
      R.prop('visitDays')
    )
  )(payload)
  return Immutable(state).merge({ payload, fetching: false, pjpShops, others })
}

export const failure = (state, action) => Immutable(state).merge({ fetching: false, error: action.error })

export const startUp = (state) => {
  if (state.dayStartDate && moment(state.dayStartDate).isBefore(new Date(), 'D')) {
    // Previous day not ended discuss logic what to do here
  }
  return Immutable(state).merge({ fetching: false })
}

export const checkOutCheck = (state, { data, userid }) =>
  R.contains(
    data.id,
    R.map(R.prop('id'))(state.achieved[userid] || [])
  ) ? state : Immutable(state).merge({ achieved: R.assoc(userid, R.concat(state.achieved[userid] || [], [data]), state.achieved) })

export const reset = state => Immutable(state).merge({
  shops: null,
  pjpShops: null,
  achieved: {},
  others: null,
  dayStartDate: AppConfig.env === 'DEV' ? {} : state.dayStartDate,
  dayStarted: AppConfig.env === 'DEV' ? {} : state.dayStarted
})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORES_SUCCESS]: success,
  [Types.STORES_REQUEST]: request,
  [Types.STORES_FAILURE]: failure,
  [Types.DAY_START_REQUEST]: dayStartRequest,
  [Types.DAY_START_SUCCESS]: dayStartSuccess,
  [Types.DAY_END_REQUEST]: dayEndRequest,
  [Types.DAY_END_SUCCESS]: dayEndSuccess,
  [Types.RESET]: reset,
  [ShopTypes.CHECK_OUT_SUCCESS]: checkOutCheck,
  'STARTUP': startUp
})
