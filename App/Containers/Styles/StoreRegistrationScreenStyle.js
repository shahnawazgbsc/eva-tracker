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
    flex: 1,
    alignSelf: 'stretch'
  },
  FormContainer: { flex: 1, backgroundColor: 'white' }
})
