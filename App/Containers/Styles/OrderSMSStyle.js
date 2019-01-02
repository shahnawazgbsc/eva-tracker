import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    flex: 1
  },
  darkText: {
    color: Colors.black,
    textAlign: 'left',
    display: 'flex',
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerContent: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.silver,
    borderTopColor: Colors.fab,
    borderBottomColor: Colors.fab,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: Metrics.smallMargin,
    borderBottomWidth: Metrics.smallMargin
  },
  headerIcon: {
    fontSize: 54,
    color: Colors.white
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listHeader: {
    flexDirection: 'row',
    alignContent:'space-between',
    justifyContent:'space-between'
  },
  item1: {
    textAlign: 'center',
    marginRight: 10,
    width: 50
  },
  item2: {
    textAlign: 'left',
    width: '50%',
    fontSize:10
  },
  item3: {
    textAlign: 'right',
    fontSize:10
  },
  item4: {
    textAlign: 'left',
    fontSize:10
  },
  item5: {
    width: 15,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  },
  itemRow: {
    flex: 2
  },
  amountText: {
    color: Colors.white,
    margin: 10
  },
  headerText: {
    color: Colors.white,

  },
  iconStyle: {
    color: 'white'
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
  }

})
