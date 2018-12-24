import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center'
  }

})
