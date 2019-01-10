import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  fab: {
    backgroundColor: Colors.fab,
    width: 50,
    height: 50,
    borderRadius: 25
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
    // borderTopColor: Colors.fab,
    // borderBottomColor: Colors.fab,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderTopWidth: Metrics.smallMargin,
    // borderBottomWidth: Metrics.smallMargin
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
    flexDirection: 'row'
  },
  item1: {
    textAlign: 'center',
    marginRight: 10,
    width: 50
  },
  item2: {
    textAlign: 'left', flexWrap: 'wrap', width: 70
  },
  item3: {
    flex: 2, textAlign: 'right', marginRight: 5, flexWrap: 'wrap', fontSize: 10
  },
  item4: {
    flex: 1, textAlign: 'left', flexWrap: 'wrap', fontSize: 10
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
    margin: 10,
    flexWrap:'wrap'
  },
  headerText: {
    color: Colors.white,

  },
  iconStyle: {
    color: 'white'
  }

})
