import * as R from 'ramda'

const GetVisitDay = () => {
  let day = new Date().getDay()
  if (day === 0) return 7
  else return day
}

export default GetVisitDay

export const hasPJPDay =
  R.compose(
    R.contains(GetVisitDay()),
    R.map(R.prop('day')),
    R.prop('visitDays')
  )

export function getPjpShops (payload) {
  return R.map(R.assoc('pjp', true))(
    R.filter(hasPJPDay, payload))
}

export function getOtherShops (payload) {
  return R.filter(R.complement(hasPJPDay), payload)
}
