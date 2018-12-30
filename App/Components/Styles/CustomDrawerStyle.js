import { StyleSheet } from 'react-native'
import { scale } from '../moderatescale'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  drawerImage: {
    // height: moderateScale(80),
    // width: moderateScale(80),
    // borderRadius: 75,
    height: scale(100),
    width: scale(160),
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
