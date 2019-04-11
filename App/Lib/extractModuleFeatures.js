import * as R from 'ramda'

export default (state) => R.compose(
  R.ifElse(R.isNil, R.always([]), R.compose(
    R.ifElse(R.isNil, R.always([]), R.prop('features')),
    R.find(R.propEq('moduleName', 'eTrackerMobile'))
  )),
  R.path(['login', 'payload', 'moduleFeatures'])
)(state)
