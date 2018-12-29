import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'
import Colors from '../../Themes/Colors'
import { moderateScale } from '../../Components/moderatescale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  darkText: {
    color: Colors.black,
    textAlign: 'left',
    display: 'flex',
    flex: 1
  },
  iconPhone: {
    marginLeft: 0,
    marginRight: 8
  },
  lightDarkText: {
    color: Colors.charcoal,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'left'
  },
  itemProduct: {
    flex: 2,
    padding: 5
  },
  itemQty: {
    width: moderateScale(80),
    textAlign: 'right',
    padding: 5
  },
  itemUnit: {
    width: moderateScale(80),
    textAlign: 'right',
    padding: 5
  },
  input: {
    width: moderateScale(80),
    height: moderateScale(30),
    padding: 5,
    margin: 5
  },
  accordion: {
    marginTop: 15
  },
  inputText: {
    textAlign: 'right',
    fontSize: 14
  },
  itemsTitle: {
    fontSize: Fonts.size.medium,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  button: {
    alignSelf: 'flex-end',
    marginVertical: 15,
    paddingHorizontal: 20
  },
  cardContainer: {
    flex: 1
  }
})
