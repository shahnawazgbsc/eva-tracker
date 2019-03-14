import * as R from 'ramda'

function GetVisitDay () {
  let day = new Date((new Date()).toLocaleString()).getDay()
  if (day === 0) return 7
  else return day
}

export default GetVisitDay

export function getPjpShops (payload) {
  return R.map(R.assoc('pjp', true))(
    R.filter(
      R.compose(
        R.contains(GetVisitDay()),
        R.map(R.prop('day')),
        R.prop('visitDays')
      ))(payload))
}

export function getOtherShops (payload) {
  return R.filter(
    R.compose(
      R.not,
      R.contains(GetVisitDay()),
      R.map(R.prop('day')),
      R.prop('visitDays')
    )
  )(payload)
}
