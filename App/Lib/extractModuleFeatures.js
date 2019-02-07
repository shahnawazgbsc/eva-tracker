import * as R from 'ramda'

export default (state) => R.compose(
  R.prop('features'),
  R.find(R.propEq('moduleName', 'eTrackerMobile')),
  R.path(['login', 'payload', 'moduleFeatures'])
)(state)
