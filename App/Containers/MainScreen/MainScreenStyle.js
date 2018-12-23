import {
  StyleSheet
} from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    alignItems: 'center',
    marginTop: 7
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    height: 102,
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    color: '#3f403e',
    marginTop: 18.7,
    marginLeft: 20,
    marginRight: 19
  },
  divider: {
    marginTop: 0.5,
    marginLeft: 20,
    marginRight: 19,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  label: {
    marginLeft: 20,
    marginRight: 19,
    marginTop: 15,
    height: 17,
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#3f403e'
  },
  input: {
    ...ApplicationStyles.shadow,
    marginRight: 19,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 21,
    height: 143,
    backgroundColor: '#f6f6f6'
  },
  pickerStyle: {
    marginTop: 4,
    marginLeft: 20,
    marginRight: 19,
    borderRadius: 3,
    borderColor: Colors.border,
    borderWidth: 10
  },
  ButtonStyle: { width: 100, justifyContent: 'center', height: 40, backgroundColor: 'rgb(3, 143, 73)' },
  ButtonTextStyle: { color: 'white', fontWeight: 'bold', fontSize: 12 }
})
