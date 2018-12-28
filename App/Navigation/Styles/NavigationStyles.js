import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import {moderateScale,scale}from '../../Components/moderatescale'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerImage: {
    // height: moderateScale(80),
    // width: moderateScale(80),
    // borderRadius: 75,
    height: scale(100), width: scale(160), alignSelf: 'center', marginBottom: 10 ,


    justifyContent: 'center',
    alignItems: 'center',
  }

})
