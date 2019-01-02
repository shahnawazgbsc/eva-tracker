import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerExtra: {
    height: 120,
    justifyContent: 'flex-start'
  },
  listStyle: {
    marginTop: -60,
    flex: 1,
    marginHorizontal: 50
  },
  darkText: {
    color: Colors.black,
    textAlign: 'left',
    display:'flex',
    flex:1
  },
  iconPhone: {
    marginLeft: 0,
    marginRight: 8,
    marginTop: 10
  },
  lightDarkText: {
    color: Colors.charcoal,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'left'
  },
  cardHeaderContainer: { backgroundColor: Colors.fab, alignSelf: 'stretch', flex: 1 },
  cardItem: { marginHorizontal: 3, backgroundColor: Colors.white, flexDirection: 'row' },
  cardChildContainer: { backgroundColor: Colors.success, alignSelf: 'stretch', flex: 1 },
  cardChildContainerDisabled: { backgroundColor: Colors.charcoal, alignSelf: 'stretch', flex: 1 },
  cardChildItem: {
    marginHorizontal: 3,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    height: 80,
    width: 80,
    margin: 15,
    borderRadius: 40
  },
  childIcon: {
    fontSize: 58,
    width: null,
    color: Colors.success
  },
  childIconDisabled: {
    fontSize: 58,
    width: null,
    color: Colors.charcoal
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden'
  }
})
