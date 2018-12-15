import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ButtonStyle: {
    justifyContent: 'space-around',
    marginTop: 8,
    marginRight: 8,
    alignSelf: 'flex-end'
  },
  pickerStyle: {
    alignSelf: 'stretch'
  },
  FormCotainer: { flex: 1, padding: 20, backgroundColor: 'white' }
})
