import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  loader: {
    backgroundColor: '#000',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
